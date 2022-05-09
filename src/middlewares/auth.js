const { jwtVerify } = require('../lib/util')
const config = require('config')
const Exception = require('../lib/exception')

const auth = async (ctx, next) => {
    // 获取路由
    let url = ctx.url
    url = url.replace(/\d+/, '*')
    let method = ctx.method
    let route = `${method}:${url}`
    // 是否是白名单
    let pass = config.get('auth').pass
    if (pass.indexOf(route) != -1) {
        await next()
    } else {
        let token = ctx.header['authorization']
        if (!token || !token.split(' ')[1]) {
            throw Exception.authErr(403, 40001, {}, 'token not found')
        }
        // 解析token
        let [error, userInfo] = jwtVerify(token.split(' ')[1])
        if (error) {
            if (error.message == 'invalid signature') {
                throw Exception.authErr(403, 40002, {}, 'token signature error')
            }
            if (error.message == 'jwt expired') {
                throw Exception.authErr(403, 40003, {}, 'token expired')
            }
            if (error.message == 'jwt malformed') {
                throw Exception.authErr(403, 40004, {}, 'token error')
            }
        }
        // 判断角色权限
        if (userInfo.role) {
            let roles = config.get('auth.role')[userInfo.role]
            if (roles.indexOf(route) != -1) {
                ctx.token = { id: userInfo.id, role: userInfo.role }
                await next()
            } else {
                throw Exception.authErr(403, 40006, {}, 'no permission')
            }
        } else {
            throw Exception.authErr(403, 40005, {}, 'token unknown')
        }

    }

}

module.exports = {
    auth
}