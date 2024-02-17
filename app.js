'use strict';
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const path = require('path');
const AutoLoad = require('@fastify/autoload');
// Pass --options via CLI arguments in command to enable these options.
module.exports.options = {};
module.exports = function (fastify, opts) {
    return __awaiter(this, void 0, void 0, function* () {
        // Place here your custom code!
        // Do not touch the following lines
        // This loads all plugins defined in plugins
        // those should be support plugins that are reused
        // through your application
        fastify.register(AutoLoad, {
            dir: path.join(__dirname, 'plugins'),
            options: Object.assign({}, opts)
        });
        // This loads all plugins defined in routes
        // define your routes in one of these
        fastify.post('/getData', (request, reply) => __awaiter(this, void 0, void 0, function* () {
            // ここに外部APIへのリクエストを書く
            // 引数のreplyを使ってWeb側へデータを渡す
            reply.send({ message: 'Hello World!' });
        }));
    });
};
