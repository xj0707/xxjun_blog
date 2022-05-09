const { createLogger, format, transports } = require("winston");
require("winston-daily-rotate-file");
const moment = require('moment')

const customFormat = format.combine(
    format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    format.printf((i) => `${i.level}: ${[i.timestamp]}: ${i.message}`)
);
const defaultOptions = {
    format: customFormat,
    datePattern: "YYYY-MM-DD",
    zippedArchive: true,
    maxSize: "20m",
    maxFiles: "14d",
};
// 日志插件
const logger = createLogger({
    format: customFormat,
    transports: [
        new transports.DailyRotateFile({
            filename: "logs/info-%DATE%.log",
            level: "info",
            ...defaultOptions,
        }),
        new transports.DailyRotateFile({
            filename: "logs/error-%DATE%.log",
            level: "error",
            ...defaultOptions,
        }),
    ],
});

// 日志中间件
const middleLog = async (ctx, next) => {
    const start = Date.now();
    await next()
    const ms = Date.now() - start;
    logger.info(`method: '${ctx.method}'; url: '${ctx.url}'; time: '${ms}ms';`)
}
// 错误中间件
const catchError = async (ctx, next) => {
    try {
        await next()
    } catch (error) {
        // 统一返回错误
        if (error.errorCode) {
            logger.error(JSON.stringify(error))
            ctx.response.status = error.code
            ctx.body = {
                errorCode: error.errorCode,
                msg: error.msg,
                err: error.err,
                errorTime: moment().format('YYYY-MM-DD HH:mm:ss')
            }
        } else {
            logger.error(JSON.stringify(error.stack))
            ctx.response.status = 500
            ctx.body = {
                errorCode: 9999,
                msg: '服务器错误',
                err: error.stack,
                errorTime: moment().format('YYYY-MM-DD HH:mm:ss')
            }
        }
    }
}

module.exports = {
    middleLog,
    logger,
    catchError
}