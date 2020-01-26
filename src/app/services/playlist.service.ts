import { Injectable } from '@angular/core';
import { Song } from '../models/Song';
import { AudioService } from './audio.service';

@Injectable({
  providedIn: 'root'
})
export class PlaylistService {

  songs: Song[] = [];
  constructor(private audioService: AudioService) { }

  addSongToPlaylist(songToAdd: Song): void {
    // Only add if song isn't already in the array
    if (!this.songs.some(song => song.spotifyTrackId === songToAdd.spotifyTrackId)) {
      this.songs.push(songToAdd);
    }
    // TODO: Error message if they try to add the same song more than once
  }

  removeSongFromPlaylist(idOfSongToRemove: string): void {
    this.songs = this.songs.filter(song => song.spotifyTrackId !== idOfSongToRemove);
    if (idOfSongToRemove === this.audioService.refAndIdOfSongPlaying.id) {
      // If the song was playing when removed, clear the audio data
      this.audioService.clearAudioData();
    }
  }
}
