import { FastifyRequest } from 'fastify'
import { SoundCloudSearchTrack } from '../use-cases/soundcloud-search-track'
import { BadRequest, BadRequestWithZod, InternalServerError, OK } from './helpers/http-response'
import { z } from 'zod'

const requestSchema = z.object({
    keywords: z.string().min(1),
    offset: z.coerce.number().max(50).optional(),
    limit: z.coerce.number().max(50).optional(),
})

export type SearchTrackProps = z.infer<typeof requestSchema>

export class SearchTrack {
    constructor (private soundCloudSearchTrack: SoundCloudSearchTrack) {}
    
    async handle (request: FastifyRequest<{Querystring: SearchTrackProps}>) {
        try {
            const { keywords, offset, limit } = requestSchema.parse(request.query);

            const tracks = await this.soundCloudSearchTrack.execute({ keywords, offset, limit });

            return OK(tracks)
        } catch (error: any) {
            if (error instanceof z.ZodError) {
                return BadRequestWithZod(error);
            }

            return InternalServerError(error);
        }
    }
}