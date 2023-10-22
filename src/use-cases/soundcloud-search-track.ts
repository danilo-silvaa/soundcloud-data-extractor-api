import axios from 'axios';
import { SearchTrackProps } from '../controllers/search-track';
import { SoundCloudScraper } from '../external/soundcloud/soundcloud-scraper';

interface Track {
    avatar_url: string,
    title: string,
    duration: number,
    likes_count: number,
    genre: string,
    created_at: string,
    last_modified: string,
    media: {
        transcodings: {
            url: string;
            format: {
                protocol: string;
            }
        }[];
    };
}

interface ApiSoundCloudResponse {
    collection: Track[];
    total_results: number;
    next_href: string;
}

export class SoundCloudSearchTrack {
    constructor (private soundCloudScraper: SoundCloudScraper) {}

    async execute ({ keywords, limit, offset }: SearchTrackProps) {
        let query = `q=${keywords}`;

        if (limit) {
            query += `&limit=${limit}`
        }

        if (offset) {
            query += `&offset=${offset}`
        }

        const url = `https://api-v2.soundcloud.com/search/tracks?${query}&client_id=${this.soundCloudScraper.clientId}`
        
        try {
            const { data } = await axios.get<ApiSoundCloudResponse>(url);

            data.collection.forEach(element => {
                element.media.transcodings.forEach(media => {
                    media.url += `?client_id=${this.soundCloudScraper.clientId}`
                });
            });

            return data;
        } catch (error) {
            return { };
        }
    }
}