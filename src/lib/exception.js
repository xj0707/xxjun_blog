const moment = require('moment')

class Exception {
    static dbHandleErr(err = {}, errorCode = 40500, msg = '数据库操作异常') {
        return {
            code: 405,
            errorCode,
            msg,
            err,
            errorTime: moment().format('YYYY-MM-DD HH:mm:ss')
        }
    }
    static serviceErr(err = {}, errorCode = 50000, msg = '服务器异常') {
        return {
            code: 500,
            errorCode,
            msg,
            err,
            errorTime: moment().format('YYYY-MM-DD HH:mm:ss')
        }
    }
    static apiErr(code = 400, errorCode = 40000, err = {}, msg = 'api操作失败') {
        return {
            code,
            errorCode,
            msg,
            err,
            errorTime: moment().format('YYYY-MM-DD HH:mm:ss')
        }
    }
    static authErr(code = 403, errorCode = 40000, err = {}, msg = '授权验证失败') {
        return {
            code,
            errorCode,
            msg,
            err,
            errorTime: moment().format('YYYY-MM-DD HH:mm:ss')
        }
    }
}



module.exports = Exception