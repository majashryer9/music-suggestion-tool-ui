import { Song } from './Song';

export interface Playlist {
    songs: Song[];
    imageUrl: string;
    timestamp?: number;
}
