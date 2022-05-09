const { sequelize } = require('../lib/db')
const { Model, DataTypes } = require('sequelize')
const { hashPwd } = require('../lib/util')


// Admin模型
class Admin extends Model { }
Admin.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    nickname: {
        type: DataTypes.STRING(50),
        allowNull: true
    },
    sex: {
        type: DataTypes.ENUM('0', '1', '2'),
        defaultValue: '0',
        allowNull: true
    },
    email: {
        type: DataTypes.STRING(50),
        unique: true,
        allowNull: false,
        comment: '登录邮箱'
    },
    password: {
        type: DataTypes.STRING,
        set(val) {
            this.setDataValue("password", hashPwd(val));
        },
        allowNull: false,
        comment: '登录密码'
    },
    score: {  // 每天登录一次得一分（一天只有一次）。每天在线满两个小时(得两分，最高得8分)，目的是根据积分来判定用户得活跃度。一天不上线减一分，减至0分为止。 这个应该单独做一个表，用于解耦，而且需要罗列积分的来源，最后汇总生成一个字段
        type: DataTypes.INTEGER,  // 所以应该是积分表和用户表生成一个视图。
        defaultValue: 0,
        allowNull: true,
        comment: '用户积分'
    },
    icon_url: {
        type: DataTypes.STRING,
        allowNull: true,
        comment: '用户头像'
    },
    login_ip: {  // 可以根据ip生成用户地址图
        type: DataTypes.STRING,
        allowNull: true,
        comment: '登录ip'
    },
    login_browser: {
        type: DataTypes.STRING,
        allowNull: true,
        comment: '登录客户端'
    },
    login_time: {
        type: DataTypes.DATE,
        allowNull: true,
        comment: '登录时间'
    }
}, {
    sequelize
})


module.exports = {
    Admin
}