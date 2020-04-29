const crypto = require('crypto')
const winston = require('winston')

global.Boom = require('@hapi/boom')
global.config = require('./config')

global.loginLogger = winston.createLogger({
  level: 'info',
  format: winston.format.simple(),
  transports: [
    new winston.transports.File({
      filename: 'logs/login.log'
    })
  ]
})
global.registerLogger = winston.createLogger({
  level: 'info',
  format: winston.format.simple(),
  transports: [
    new winston.transports.File({
      filename: 'logs/register.log'
    })
  ]
})

global.encrypt = (text) => {
  const cipher = crypto.createCipher('aes-256-cbc', 'd6F3Efeq')
  let crypted = cipher.update(text, 'utf8', 'hex')
  crypted += cipher.final('hex')
  return crypted
}

global.decrypt = (text) => {
  const decipher = crypto.createDecipher('aes-256-cbc', 'd6F3Efeq')
  let dec = decipher.update(text, 'hex', 'utf8')
  dec += decipher.final('utf8')
  return dec
}