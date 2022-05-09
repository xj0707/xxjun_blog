const { sequelize } = require('../lib/db')
const { Model, DataTypes } = require('sequelize')


// Comment模型
class Comment extends Model { }
Comment.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    article_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: '文章id'
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: '评论人id'
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: false,
        comment: '评论内容'
    }
}, {
    sequelize
})


module.exports = {
    Comment
}