const { Article } = require('../model/article')
const Exception = require('../lib/exception')
const { logger } = require('../middlewares/logger')

class ArticleDao {
    // 创建文章
    static async create(params) {
        try {
            const res = await Article.create(params);
            return [null, { id: res.id }]
        } catch (error) {
            logger.error(JSON.stringify(error.stack))
            return [Exception.dbHandleErr(error), null]
        }
    }
    // 删除文章
    static async destroy(id) {
        try {
            const article = await Article.findByPk(id);
            // 不存在抛出错误
            if (!article) {
                return [Exception.apiErr(404, 40401, {}, '没有找到相关文章'), null]
            }
            const res = await article.destroy()
            return [null, res]
        } catch (error) {
            logger.error(JSON.stringify(error.stack))
            return [Exception.dbHandleErr(error), null]
        }
    }
    // 查询文章列表
    static async findAll() {
        try {
            const articleList = await Article.findAll()
            return [null, articleList]
        } catch (error) {
            logger.error(JSON.stringify(error.stack))
            return [Exception.dbHandleErr(error), null]
        }
    }
    // 获取文章信息
    static async findOne(id) {
        try {
            const article = await Article.findByPk(id);
            // 不存在抛出错误
            if (!article) {
                return [Exception.apiErr(404, 40401, {}, '没有找到相关用户'), null]
            }
            return [null, article]
        } catch (error) {
            logger.error(JSON.stringify(error.stack))
            return [Exception.dbHandleErr(error), null]
        }
    }

    // 更新文章
    static async update(id, params) {
        try {
            // 检测是否存在用户
            const article = await Article.findByPk(id);
            // 不存在抛出错误
            if (!article) {
                return [Exception.apiErr(404, 404001, {}, '没有找到相关用户'), null]
            }
            const res = await article.update(params)
            return [null, res]
        } catch (error) {
            logger.error(JSON.stringify(error.stack))
            return [Exception.dbHandleErr(error), null]
        }
    }
}

module.exports = ArticleDao
