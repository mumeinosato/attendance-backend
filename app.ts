'use strict'

const path = require('path')
const AutoLoad = require('@fastify/autoload')

// Pass --options via CLI arguments in command to enable these options.
module.exports.options = {}

module.exports = async function (fastify: any, opts: any) {
  // Place here your custom code!

  // Do not touch the following lines

  // This loads all plugins defined in plugins
  // those should be support plugins that are reused
  // through your application
  fastify.register(AutoLoad, {
    dir: path.join(__dirname, 'plugins'),
    options: Object.assign({}, opts)
  })

  // This loads all plugins defined in routes
  // define your routes in one of these
fastify.post('/getData', async (request: any, reply: any) => {
    // ここに外部APIへのリクエストを書く

    // 引数のreplyを使ってWeb側へデータを渡す
    reply.send({message: 'Hello World!'});
});
}