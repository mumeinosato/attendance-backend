// 必要なモジュールをインポート
import { FastifyInstance, FastifyRequest } from 'fastify';
import { getPasswordNull, login, getAccountInfo, setPassword, userExists } from './db';
import cores from '@fastify/cors';

module.exports = async function (fastify: FastifyInstance, opts: any) {
  // CORSを有効にする
  await fastify.register(cores, {
    origin: '*',
    methods: ['GET', 'POST'],
  });

  // ルートの定義
  fastify.get('/passwordNull/:user', async (request: FastifyRequest<{ Params: { user: string } }>, reply) => {
    const user = request.params.user;
    const isNull = await getPasswordNull(user);
    reply.send({ passwordIsNull: isNull });
  });

  fastify.post('/login', async (request: FastifyRequest<{ Body: { id: string, password: string } }>, reply) => {
    const { id, password } = request.body;
    const isLoggedIn = await login(id, password);
    reply.send({ loggedIn: isLoggedIn });
  });

  fastify.get('/accountInfo/:id', async (request: FastifyRequest<{ Params: { id: string } }>, reply) => {
    const id = request.params.id;
    const accountInfo = await getAccountInfo(id);
    reply.send(accountInfo);
  });

  fastify.post('/setPassword', async (request, reply) => {
    const { user, password } = request.body as { user: string, password: string };
    try {
      await setPassword(user, password);
      reply.code(200).send({ message: 'パスワードが更新されました。' });
    } catch (error) {
      reply.code(500).send({ error: 'パスワードの更新中にエラーが発生しました。' });
    }
  });

  fastify.get('/userExists/:name', async (request: FastifyRequest<{ Params: { name: string } }>, reply) => {
    const name = request.params.name;
    const exists = await userExists(name);
    reply.send({ exists });
  });
}
