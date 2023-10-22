import { FastifyRequest, FastifyReply } from 'fastify';

interface Controller {
    handle(request: FastifyRequest): Promise<{statusCode: number; payload: any}>;
}

export const adaptRoute = (controller: Controller) => {
    return async (request: FastifyRequest, reply: FastifyReply) => {
        const { statusCode, payload } = await controller.handle(request)

        reply.code(statusCode).send(payload)
    }
}