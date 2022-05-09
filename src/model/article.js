const { sequelize } = require('../lib/db')
const { Model, DataTypes } = require('sequelize')


// Admin模型
class Article extends Model { }
Article.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    title: {
        type: DataTypes.STRING(50),
        allowNull: false,
        comment: '标题'
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: false,
        comment: '内容'
    },
    admin_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: '发布者id'
    },
    favorite_num: {  
        type: DataTypes.INTEGER,
        allowNull: true,
        comment: '点赞数'
    }
}, {
    sequelize
})


module.exports = {
    Article
}