const nodemailer = require('nodemailer')
const config = require('config')
const { logger } = require('../middlewares/logger')

const transport = nodemailer.createTransport({
    service: config.get('email').service,  // 邮件类型 如qq, 163
    auth: {
        user: config.get('email').user,  // 开启smtp的邮箱
        pass: config.get('email').pass  // 邮箱授权码
    }
})

const sendEmail = (toEmail, subject, data) => {
    return new Promise((resolve, reject) => {
        transport.sendMail({
            from: config.get('email').from,  // 发件人
            to: toEmail,   // 接受人
            subject: subject,  // 主题
            text: data,  // 内容，text和html两者的一种
            // html:'', // 内容
            attachments: [{  // 附件
                filename: '1.jpg',
                path: './public/fedfeb1ca120c0705524fff01.jpg'
            }]
        }, function (err, res) {
            if (err) {
                logger.error(err)
                reject(err)
            }
            resolve(res)
        })
    })

}


module.exports = {
    sendEmail
} 