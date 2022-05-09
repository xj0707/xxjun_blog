const Router = require('koa-router')
const { Response } = require('../lib/util')
const AdminDao = require('../dao/admin')
const Exception = require('../lib/exception')
const router = new Router({
    prefix: '/api'
})

/**
 * 上传
 */
router.post('/upload', async (ctx) => {
    // 获取入参
    const files = ctx.request.files.file
    const { id } = ctx.request.body
    if (!files || !id) {
        return Response.fail(ctx, Exception.apiErr(400, 40002, {}, '参数验证失败'))
    }
    let filename = files.newFilename
    // 更新db
    let admin = await AdminDao.update(id, { icon_url: filename })
    // 结果返回
    return Response.ok(ctx, { id: admin.id })
})


module.exports = router