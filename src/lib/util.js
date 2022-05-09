const bcrypt = require('bcryptjs')
const moment = require('moment');
const jwt = require('jsonwebtoken')
const config = require('config')



// 使用10个哈希回合生成安全密码
const hashPwd = (val) => {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(val, salt);
}

// 密码比较
const comparePwd = (inputPwd, dbPwd) => {
    return bcrypt.compareSync(inputPwd, dbPwd)
}

// 生成token
const generateJwt = (data) => {
    return jwt.sign(data, config.get('jwt').secret, { expiresIn: config.get('jwt').expiresIn })
}

// token 解析
const jwtVerify = (token) => {
    return jwt.verify(token, config.get('jwt').secret, function (err, decoded) {
        if (err) {
            return [err, null]
        } else {
            return [null, decoded]
        }
    })
}

// 响应结果
class Response {
    static fail(ctx, error) {
        ctx.response.status = error.code
        ctx.body = error
        return
    }
    static ok(ctx, data, otherObj = {}) {
        ctx.response.status = 200
        ctx.body = {
            data,
            msg: 'success',
            errorCode: 0,
            ...otherObj
        }
        return
    }
}


module.exports = {
    hashPwd,
    comparePwd,
    Response,
    generateJwt,
    jwtVerify
}