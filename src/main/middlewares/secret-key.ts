import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod'

const requestSchema = z.object({
    secret_key: z.string()
})

export default {
    preHandler: (request: FastifyRequest<{Querystring: z.infer<typeof requestSchema>}>, reply: FastifyReply, done: any) => {
        try {
            const { secret_key } = requestSchema.parse(request.query);
            
            const allowedKeys = process.env.ALLOWED_SECRETKEYS ? process.env.ALLOWED_SECRETKEYS.split(', '): [];
            
            if (!allowedKeys.includes(secret_key)){
                return reply.code(401).send();
            }

            done()
        } catch (error) {
            return reply.code(401).send();
        }
    }
};