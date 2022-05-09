const Router = require('koa-router')
const CommentDao = require('../dao/comment')
const { Response } = require('../lib/util')
const { ajvVerify } = require('../lib/validator')
const { addCommentSchema, deleteCommentSchema, updateCommenteSchema } = require('../schema/comment')

const router = new Router({
    prefix: '/api/comment'
})

/**
 * 新增
 */
router.post('/add', async (ctx) => {
    // 获取入参
    const { article_id, content } = ctx.request.body
    const user_id = ctx.token.id
    // 入参校验
    let validator = ajvVerify(addCommentSchema, { article_id, content })
    if (validator) {
        return Response.fail(ctx, validator)
    }
    // db 操作
    let [err, res] = await CommentDao.create({ article_id, user_id, content })
    if (!err) {
        return Response.ok(ctx, res)
    } else {
        return Response.fail(ctx, err)
    }
})
/**
 * 删除
 */
router.delete('/:id', async (ctx) => {
    // 获取入参
    const id = ctx.params.id
    // 入参校验
    let validator = ajvVerify(deleteCommentSchema, { id })
    if (validator) {
        return Response.fail(ctx, validator)
    }
    // db 操作
    let [err, res] = await CommentDao.destroy(id)
    if (!err) {
        return Response.ok(ctx, res)
    } else {
        return Response.fail(ctx, err)
    }
})

/**
 * 获取某个文章的评论列表
 */
router.get('/list/:id', async (ctx) => {
    // db 操作
    const id = ctx.params.id
    // 入参校验
    let validator = ajvVerify(deleteCommentSchema, { id })
    if (validator) {
        return Response.fail(ctx, validator)
    }
    let [err, res] = await CommentDao.findAll(id)
    if (!err) {
        return Response.ok(ctx, res)
    } else {
        return Response.fail(ctx, err)
    }
})

/**
 * 更新评论信息
 */
router.put('/:id', async (ctx) => {
    // 获取入参
    const id = ctx.params.id
    const inparam = ctx.request.body
    inparam.id = id
    // 入参校验
    let validator = ajvVerify(updateCommenteSchema, inparam)
    if (validator) {
        return Response.fail(ctx, validator)
    }
    delete inparam.id
    // db 操作
    let [err, res] = await CommentDao.update(id, inparam)
    if (!err) {
        return Response.ok(ctx, { id: res.id })
    } else {
        return Response.fail(ctx, err)
    }
})


module.exports = router