const Router = require('koa-router')
const ArticleDao = require('../dao/article')
const { Response } = require('../lib/util')
const { ajvVerify } = require('../lib/validator')
const { addArticleSchema, deleteArticleSchema, updateArticleSchema } = require('../schema/article')

const router = new Router({
    prefix: '/api/article'
})

/**
 * 创建
 */
router.post('/add', async (ctx) => {
    // 获取入参
    const { title, content } = ctx.request.body
    console.log(ctx.token)
    const admin_id = ctx.token.id
    // 入参校验
    let validator = ajvVerify(addArticleSchema, { title, content })
    if (validator) {
        return Response.fail(ctx, validator)
    }
    // db 操作
    let [err, res] = await ArticleDao.create({ title, content, admin_id })
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
    let validator = ajvVerify(deleteArticleSchema, { id })
    if (validator) {
        return Response.fail(ctx, validator)
    }
    // db 操作
    let [err, res] = await ArticleDao.destroy(id)
    if (!err) {
        return Response.ok(ctx, res)
    } else {
        return Response.fail(ctx, err)
    }
})

/**
 * 获取article列表
 */
router.get('/list', async (ctx) => {
    // db 操作
    let [err, res] = await ArticleDao.findAll()
    if (!err) {
        return Response.ok(ctx, res)
    } else {
        return Response.fail(ctx, err)
    }
})


/**
 * 查看article信息
 */
router.get('/:id', async (ctx) => {
    // 获取入参
    const id = ctx.params.id
    // 入参校验
    let validator = ajvVerify(deleteArticleSchema, { id })
    if (validator) {
        return Response.fail(ctx, validator)
    }
    // db 操作
    let [err, res] = await ArticleDao.findOne(id)
    if (!err) {
        return Response.ok(ctx, res)
    } else {
        return Response.fail(ctx, err)
    }
})
/**
 * 更新article信息
 */
router.put('/:id', async (ctx) => {
    // 获取入参
    const id = ctx.params.id
    const inparam = ctx.request.body
    inparam.id = id
    // 入参校验
    let validator = ajvVerify(updateArticleSchema, inparam)
    if (validator) {
        return Response.fail(ctx, validator)
    }
    delete inparam.id
    // db 操作
    let [err, res] = await ArticleDao.update(id, inparam)
    if (!err) {
        return Response.ok(ctx, { id: res.id })
    } else {
        return Response.fail(ctx, err)
    }
})



module.exports = router