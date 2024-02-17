"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("./db");
/*app.get('/passwordNull/:name', async (request: FastifyRequest<{ Params: { name: string } }>, reply) => {
    const name = request.params.name;
    const isNull = await getPasswordNull(name);
    reply.send({ passwordIsNull: isNull });
  });

app.post('/login', async (request: FastifyRequest<{ Body: { id: string, password: string } }>, reply) => {
    const { id, password } = request.body;
    const isLoggedIn = await login(id, password);
    reply.send({ loggedIn: isLoggedIn });
});

app.get('/accountInfo/:id', async (request: FastifyRequest<{ Params: { id: string } }>, reply) => {
        const id = request.params.id;
        const accountInfo = await getAccountInfo(id);
        reply.send(accountInfo);
});

app.post('/setPassword', async (request: FastifyRequest<{ Body: { id: string, password: string } }>, reply) => {
    const { id, password } = request.body as { id: string, password: string };
    await setPassword(id, password);
    reply.send({ success: true });
});

app.get('/userExists/:name', async (request: FastifyRequest<{ Params: { name: string } }>, reply) => {
    const name = request.params.name;
    const exists = await userExists(name);
    reply.send({ exists });
});*/
const path = require("path");
const autoload_1 = require("@fastify/autoload");
// Pass --options via CLI arguments in command to enable these options.
module.exports.options = {};
module.exports = async function (fastify, opts) {
    // Place here your custom code!
    // Do not touch the following lines
    // This loads all plugins defined in plugins
    // those should be support plugins that are reused
    // through your application
    fastify.register(autoload_1.default, {
        dir: path.join(__dirname, 'plugins'),
        options: Object.assign({}, opts)
    });
    // This loads all plugins defined in routes
    // define your routes in one of these
    fastify.register(autoload_1.default, {
        dir: path.join(__dirname, 'routes'),
        options: Object.assign({}, opts)
    });
    fastify.register(require('@fastify/cors'));
    fastify.post('/getData', async (request, reply) => {
        // ここに外部APIへのリクエストを書く
        // 引数のreplyを使ってWeb側へデータを渡す
        reply.send({ message: 'Hello World!' });
    });
    fastify.get('/passwordNull/:user', async (request, reply) => {
        const user = request.params.user;
        const isNull = await (0, db_1.getPasswordNull)(user);
        reply.send({ passwordIsNull: isNull });
    });
};
