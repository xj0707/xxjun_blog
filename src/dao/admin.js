const { Admin } = require('../model/admin')
const Exception = require('../lib/exception')
const { comparePwd } = require('../lib/util')
const { logger } = require('../middlewares/logger')

class AdminDao {
    // 创建管理员
    static async create(params) {
        try {
            // 查找管理员是否存在
            const admin = await Admin.findOne({
                where: {
                    email: params.email
                },
                paranoid: false
            })
            if (admin) {
                return [Exception.apiErr(403, 40300, { email: params.email }, '邮箱已存在'), null]
            }
            const res = await Admin.create(params);
            return [null, { id: res.id }]
        } catch (error) {
            logger.error(JSON.stringify(error.stack))
            return [Exception.dbHandleErr(error), null]
        }
    }
    // 删除管理员
    static async destroy(id) {
        try {
            // 检测是否存在用户
            const admin = await Admin.findByPk(id);
            // 不存在抛出错误
            if (!admin) {
                return [Exception.apiErr(404, 40401, {}, '没有找到相关用户'), null]
            }
            // 软删除用户
            const res = await admin.destroy()
            return [null, res]
        } catch (error) {
            logger.error(JSON.stringify(error.stack))
            return [Exception.dbHandleErr(error), null]
        }
    }
    // 查询管理员列表
    static async findAll() {
        try {
            const adminList = await Admin.findAll({
                attributes: ['id', 'nickname', 'sex', 'email', 'score', 'icon_url', 'login_time']
            })
            return [null, adminList]
        } catch (error) {
            logger.error(JSON.stringify(error.stack))
            return [Exception.dbHandleErr(error), null]
        }
    }
    // 获取管理员信息
    static async findOne(id) {
        try {
            // 检测是否存在用户
            const admin = await Admin.findByPk(id);
            // 不存在抛出错误
            if (!admin) {
                return [Exception.apiErr(404, 40401, {}, '没有找到相关用户'), null]
            }
            return [null, admin]
        } catch (error) {
            logger.error(JSON.stringify(error.stack))
            return [Exception.dbHandleErr(error), null]
        }
    }

    // 更新管理员
    static async update(id, params) {
        try {
            // 检测是否存在用户
            const admin = await Admin.findByPk(id);
            // 不存在抛出错误
            if (!admin) {
                return [Exception.apiErr(404, 404001, {}, '没有找到相关用户'), null]
            }
            const res = await admin.update(params)
            return [null, res]
        } catch (error) {
            logger.error(JSON.stringify(error.stack))
            return [Exception.dbHandleErr(error), null]
        }
    }

    // 管理员登录
    static async login(email, password) {
        try {
            // 查找管理员是否存在
            const admin = await Admin.findOne({
                where: {
                    email: email
                }
            })
            if (!admin) {
                return [Exception.apiErr(404, 404002, {}, '邮箱或密码错误'), null]
            }
            let res = comparePwd(password, admin.password)
            if (!res) {
                return [Exception.apiErr(404, 404002, {}, '邮箱或密码错误'), null]
            }
            return [null, admin]
        } catch (error) {
            logger.error(JSON.stringify(error.stack))
            return [Exception.dbHandleErr(error), null]
        }
    }
}

module.exports = AdminDao
