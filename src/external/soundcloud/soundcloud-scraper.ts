import axios from 'axios';

export class SoundCloudScraper {
    public clientId = '';
    private scriptUrl = '';

    async initialize () {
        try {
            const { data } = await axios.get('https://soundcloud.com/');
            const matches: RegExpMatchArray[] = Array.from(data.matchAll(/<script crossorigin src="([^"]+)"/g));

            const lastUrl = matches[matches.length - 1];
            if (!lastUrl) {
                return;
            }

            this.scriptUrl = lastUrl[1];

            await this.extractClientKey();
        } catch (error) {
            console.error('initialize: ', error);
        }
    }

    async extractClientKey () {
        try {
            const { data } = await axios.get(this.scriptUrl);
            const match = data.match(/{client_id:"([^"]+)"}/);

            this.clientId = match[1] ?? '';
        } catch (error) {
            console.error('extractClientKey: ', error);
        }
    }
}