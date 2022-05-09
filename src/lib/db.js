const { Sequelize } = require('sequelize')
const config = require('config')
const db = config.get('db')
const { logger } = require('../middlewares/logger')

// 连接数据库 
const sequelize = new Sequelize(db.database, db.username, db.password, {
    host: db.host,
    dialect: 'mysql',
    logging: true, // false 关闭控制台日志输出，也可以配置输入到文件中
    // logging: msg => logger.info(msg),
    define: {
        freezeTableName: true,   // 表名和模型名一致，这是全局定义的。 不定义，默认会给模型加上s
        timestamps: true,
        paranoid: true,    // 定义删除为软删除，并生成deletedAt
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: 'deleted_at',
    }
});

// 测试连接是否正常
sequelize.authenticate().then(res => {
    logger.info('Connection has been established successfully.')
}).catch(err => {
    logger.error(`Unable to connect to the database: ${JSON.stringify(err)}`)
})


// 模型同步
sequelize.sync({ force: false })  // 如果表不存在,则创建该表(如果已经存在,则不执行任何操作); { force: true },如果表已经存在,则将其首先删除


module.exports = {
    sequelize
}