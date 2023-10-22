import fastify from 'fastify';
import cors from '@fastify/cors';
import router from './routes/api';
import 'dotenv/config';

const server = fastify();

server.register(cors, { origin: true })
server.register(router, { prefix: '/v1' });

server.listen({
    host: '0.0.0.0',
    port: Number(process.env.PORT) ?? 3333
})