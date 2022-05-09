const Router = require('koa-router')
const { Response, generateJwt } = require('../lib/util')
const { ajvVerify } = require('../lib/validator')
const { loginSchema } = require('../schema/login')
const { sendEmail } = require('../lib/email')
const AdminDao = require('../dao/admin')
const router = new Router({
    prefix: '/api'
})

/**
 * 登录
 */
router.post('/login', async (ctx) => {
    // 获取入参
    const { email, password } = ctx.request.body
    const clientIP = ctx.request.ip
    const clinetBrowser = ctx.request.header['user-agent']

    // 入参校验
    let validator = ajvVerify(loginSchema, { email, password })
    if (validator) {
        return Response.fail(ctx, validator)
    }
    // 管理员查询
    let [err, admin] = await AdminDao.login(email, password)
    if (err) {
        return Response.fail(ctx, err)
    }
    // 生成token
    let token = generateJwt({ id: admin.id, ip: clientIP, role: 'admin' })
    // 更新数据库
    const res = await admin.update({ score: admin.score + 1, login_ip: clientIP, login_browser: clinetBrowser, login_time: Date.now() })
    // 结果返回
    return Response.ok(ctx, { id: admin.id, token })
})
/**
 * 退出
 */
router.post('/logout', async (ctx) => {

})
/**
 * 找回密码
 */
router.post('/resetPwd', async (ctx) => {
    // 获取入参
    const { email } = ctx.request.body
    // 入参检查

    // 数据库校验

    // 发送邮件
    let res = await sendEmail(email, 'myblog reset passord', '我要重置密码~')

    // 结果响应
    return Response.ok(ctx, res)
})


module.exports = router