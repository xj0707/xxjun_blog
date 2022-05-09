const Router = require('koa-router')
const AdminDao = require('../dao/admin')
const { Response } = require('../lib/util')
const { ajvVerify } = require('../lib/validator')
const { get, set } = require('../lib/redis')
const { registerAdminSchema, deleteAdminSchema, updateAdminSchema } = require('../schema/admin')

const router = new Router({
    prefix: '/api/admin'
})

/**
 * 注册
 */
router.post('/register', async (ctx) => {
    // 获取入参
    const { email, password } = ctx.request.body
    // 入参校验
    let validator = ajvVerify(registerAdminSchema, { email, password })
    if (validator) {
        return Response.fail(ctx, validator)
    }
    // db 操作
    let [err, res] = await AdminDao.create({ email, password })
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
    let validator = ajvVerify(deleteAdminSchema, { id })
    if (validator) {
        return Response.fail(ctx, validator)
    }
    // db 操作
    let [err, res] = await AdminDao.destroy(id)
    if (!err) {
        return Response.ok(ctx, res)
    } else {
        return Response.fail(ctx, err)
    }
})

/**
 * 获取admin列表
 */
router.get('/list', async (ctx) => {
    // db 操作
    let [err, res] = await AdminDao.findAll()
    if (!err) {
        return Response.ok(ctx, res)
    } else {
        return Response.fail(ctx, err)
    }
})


/**
 * 查看个人信息
 */
router.get('/:id', async (ctx) => {
    // 获取入参
    const id = ctx.params.id
    // 入参校验
    let validator = ajvVerify(deleteAdminSchema, { id })
    if (validator) {
        return Response.fail(ctx, validator)
    }
    // db 操作
    let [err, res] = await AdminDao.findOne(id)
    let test = await get('test')
    if (!err) {
        return Response.ok(ctx, res, { test })
    } else {
        return Response.fail(ctx, err)
    }
})
/**
 * 更新个人信息
 */
router.put('/:id', async (ctx) => {
    // 获取入参
    const id = ctx.params.id
    const inparam = ctx.request.body
    inparam.id = id
    // 入参校验
    let validator = ajvVerify(updateAdminSchema, inparam)
    if (validator) {
        return Response.fail(ctx, validator)
    }
    delete inparam.id
    // db 操作
    let [err, res] = await AdminDao.update(id, inparam)
    if (!err) {
        return Response.ok(ctx, { id: res.id })
    } else {
        return Response.fail(ctx, err)
    }
})

/**
 * 获取用户信息
 */
router.post('/userInfo', async (ctx) => {

})


module.exports = router