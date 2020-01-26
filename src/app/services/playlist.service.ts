import { Injectable } from '@angular/core';
import { Song } from '../models/Song';

@Injectable({
  providedIn: 'root'
})
export class PlaylistService {

  songs: Song[] = [];
  constructor() { }

  addSongToPlaylist(songToAdd: Song): void {
    // Only add if song isn't already in the array
    if (!this.songs.some(song => song.spotifyTrackId === songToAdd.spotifyTrackId)) {
      this.songs.push(songToAdd);
    }
    // TODO: Error message if they try to add the same song more than once
  }
}
