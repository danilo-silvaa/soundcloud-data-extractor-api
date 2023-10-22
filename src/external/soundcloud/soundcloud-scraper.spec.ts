import { expect, it } from 'vitest';
import { SoundCloudScraper } from './soundcloud-scraper';

it('should be able to extract the client_id from SoundCloud.', async () => {
    const soundCloudScraper = new SoundCloudScraper();

    await soundCloudScraper.initialize();

    expect(soundCloudScraper.clientId).toBeTruthy();
});