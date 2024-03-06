// 必要なモジュールをインポート
import { FastifyInstance, FastifyRequest } from 'fastify';
import { createUser } from './script/account';
import { getPasswordNull, getAccountInfo, userExists, accountList } from './script/account/account_info';
import { attendance } from './script/attendance';
import { login } from './script/account/login';
import { setpass } from './script/account/setpass';
import cores from '@fastify/cors';
import fastify = require('fastify');
import { request } from 'http';

module.exports = async function (fastify: FastifyInstance, opts: any) {
  // CORSを有効にする
  await fastify.register(cores, {
    origin: '*',
    methods: ['GET', 'POST'],
  });

  // ルートの定義
  fastify.get('/passwordNull/:user', async (request, reply) => {
    const { id } = request.params as { id: number };
    const isNull = await getPasswordNull(id);
    reply.send(isNull);
  });

  fastify.post('/login', async (request, reply) => {
    const { id, password } = request.body as { id: string, password: string };
    const status = await login(id, password);
    reply.send(status);
  });

  fastify.get('/accountInfo/:id', async (request: FastifyRequest<{ Params: { id: string } }>, reply) => {
    const id = request.params.id;
    const accountInfo = await getAccountInfo(id);
    reply.send(accountInfo);
  });

  fastify.post('/setPassword', async (request, reply) => {
    const { user, password } = request.body as { user: string, password: string };
    const status = await setpass(user, password);
    reply.send(status);
  });

  /*fastify.get('/userExists/:name', async (request: FastifyRequest<{ Params: { name: string } }>, reply) => {
    const name = request.params.name;
    const exists = await userExists(name);
    reply.send({ exists });
  });*/

  fastify.get('/accountList', async (request, reply) => {
    const List = await accountList();
    reply.send(List);
  });

  fastify.post('/createUser', async (request, reply) => {
    const { user, name, admin, group } = request.body as { user: string, name: string, admin: number, group: string };
    try {
      await createUser(user, name, admin, group);
      reply.code(200).send({ message: 'ユーザーが作成されました。' });
    } catch (error) {
      reply.code(500).send({ error: 'ユーザーの作成中にエラーが発生しました。' });
      
    }
  });

  fastify.post('/attendance', async (request, reply) => {
    const { user, status, reason } = request.body as { user: string, status: number, reason: string};
    try {
      await attendance(user, status, reason);
      reply.code(200).send({ message: '出席情報が更新されました。' });
    } catch (error) {
      reply.code(500).send({ error: '出席情報の更新中にエラーが発生しました。' });
    }
  });
}