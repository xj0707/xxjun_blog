const { Comment } = require('../model/comment')
const Exception = require('../lib/exception')
const { logger } = require('../middlewares/logger')

class CommentDao {
    // 创建评论
    static async create(params) {
        try {
            // 校验 article_id 和user_id
            const res = await Comment.create(params);
            return [null, { id: res.id }]
        } catch (error) {
            logger.error(JSON.stringify(error.stack))
            return [Exception.dbHandleErr(error), null]
        }
    }
    // 删除评论
    static async destroy(id) {
        try {
            const comment = await Comment.findByPk(id);
            // 不存在抛出错误
            if (!comment) {
                return [Exception.apiErr(404, 40401, {}, '没有找到相关用户'), null]
            }
            // 软删除用户
            const res = await comment.destroy()
            return [null, res]
        } catch (error) {
            logger.error(JSON.stringify(error.stack))
            return [Exception.dbHandleErr(error), null]
        }
    }
    // 查询评论根据文章id
    static async findAll(id) {
        try {
            const commentList = await Comment.findAll({
                where: {
                    article_id: id
                }
            })
            return [null, commentList]
        } catch (error) {
            logger.error(JSON.stringify(error.stack))
            return [Exception.dbHandleErr(error), null]
        }
    }


    // 更新评论
    static async update(id, params) {
        try {
            const comment = await Comment.findByPk(id);
            // 不存在抛出错误
            if (!comment) {
                return [Exception.apiErr(404, 404001, {}, '没有找到相关用户'), null]
            }
            const res = await comment.update(params)
            return [null, res]
        } catch (error) {
            logger.error(JSON.stringify(error.stack))
            return [Exception.dbHandleErr(error), null]
        }
    }
}

module.exports = CommentDao
