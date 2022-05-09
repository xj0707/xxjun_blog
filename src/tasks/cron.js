const cron = require('node-cron')
const { get, set } = require('../lib/redis')
const { logger } = require('../middlewares/logger')
/**
 * 秒（可选） 分 时 月的天 月份 星期几
 */
// */1 * * * * 每分钟统计一次
// * 8 * * * 每天的八点统计
cron.schedule('*/1 * * * *', async () => {
    logger.info('开始定时任务')
    let a = await get('test')
    a += 10
    await set('test', a)
    logger.info('定时任务结束')
})