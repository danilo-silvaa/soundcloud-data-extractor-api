import { FastifyInstance } from 'fastify';
import { adaptRoute } from '../adapters/fastify-route-adapter';
import { searchTrack } from '../factories/search';
import SecretKeyMiddleware from '../middlewares/secret-key';

const routes = async (fastify: FastifyInstance) => {
    fastify.get('/search', SecretKeyMiddleware, adaptRoute(await searchTrack()))
}

export default routes;