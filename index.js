const Koa = require('koa')
const logger = require('koa-logger')

// global constant and function
require('./global')

const app = new Koa()

// error handling with @hapi/boom
app.use(async (ctx, next) => {
  try {
    await next()
  } catch (err) {
    console.error(err)
    if (err.isBoom) {
      ctx.status = err.output.statusCode
      ctx.body = {
        error: err.output.payload.error,
        message: err.message
      }
    } else {
      ctx.status = 500
      ctx.body = {
        error: 'Internal Server Error',
        message: 'An internal server error occurred'
      }
      ctx.app.emit('error', err, ctx)
    }
  }
})
// styled logger
app.use(logger())

app.listen(config.port || 3000, () => {
  console.log(`Server listening on port ${config.port}`)
})
