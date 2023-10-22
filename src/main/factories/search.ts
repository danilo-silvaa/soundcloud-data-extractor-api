import { SearchTrack } from '../../controllers/search-track'
import { SoundCloudScraper } from '../../external/soundcloud/soundcloud-scraper';
import { SoundCloudSearchTrack } from '../../use-cases/soundcloud-search-track';

export const searchTrack = async (): Promise<SearchTrack> => {
    const soundCloudScraper = new SoundCloudScraper()
    await soundCloudScraper.initialize();
    const soundCloudSearchTrack = new SoundCloudSearchTrack(soundCloudScraper)
    const searchTrack = new SearchTrack(soundCloudSearchTrack);
    return searchTrack;
}