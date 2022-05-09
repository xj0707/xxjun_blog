const redis = require('redis')
const config = require('config')
const { logger } = require('../middlewares/logger')
const client = redis.createClient({ host: config.get('redis.host'), port: config.get('redis.port'), auth_pass: config.get('redis.pwd') })

client.on('error', function (err) {
    logger.error('Error ' + err)
})

function set(key, value) {
    return new Promise((resolve, reject) => {
        if (typeof value === 'object') {
            value = JSON.stringify(value)
        }
        client.set(key, value, (err, replay) => {
            if (err) {
                logger.error('redis set:' + err)
                reject(err)
            }
            resolve(replay)
        })
    })
}
function get(key) {
    return new Promise((resolve, reject) => {
        client.get(key, (err, val) => {
            if (err) {
                logger.error('redis get:' + err)
                reject(err)
            }
            try {
                resolve(JSON.parse(val))
            } catch (error) {
                resolve(val)
            }
        })
    })
}

module.exports = {
    set,
    get
}