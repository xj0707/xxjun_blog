const koa = require('koa')
const config = require('config')   // 配置文件，用于切换环境
const cors = require('koa-cors');  // 跨域处理
// 使用koa-body 代替koa-bodyparser 和 koa-multer
const koaBody = require('koa-body')
const static = require('koa-static')

const { host, port } = config.get('service')
const { middleLog, logger, catchError } = require('./middlewares/logger')
const { auth } = require('./middlewares/auth')

const admin = require('./routes/admin')
const article = require('./routes/article')
const comment = require('./routes/comment')
const login = require('./routes/login')
const upload = require('./routes/upload')
require('./tasks/cron')

const app = new koa()
app.use(cors())
app.use(catchError)
app.use(middleLog)
app.use(auth)
app.use(koaBody({  // ctx.request.files
    multipart: true,// 支持多文件上传
    formidable: {
        maxFieldsSize: 2 * 1024 * 1024, // 限制大小
        uploadDir: `${process.cwd()}/public`, // 上传存放地址
        keepExtensions: true  // 保持原来的后缀
    }
}))
app.use(static(`${process.cwd()}/public`))  // 访问http://localhost:3000/XXX.png


app.use(admin.routes())
app.use(article.routes())
app.use(comment.routes())
app.use(login.routes())
app.use(upload.routes())



app.on('error', err => {
    logger.error('server error', err)
});

app.listen(port, host, () => {
    console.log(`start service ${host}:${port}`)
})