import { Injectable } from '@angular/core';
import { Song } from '../models/Song';
import { AudioService } from './audio.service';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Playlist } from '../models/Playlist';

@Injectable({
  providedIn: 'root'
})
export class PlaylistService {

  songs: Song[] = [];
  imageUrl: string;
  constructor(private audioService: AudioService, private http: HttpClient) { }

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

  getPlaylistImage(query?: string): Observable<object> {
    const url = `${environment.baseUrl}/playlist/image`;
    const body = {
      query
    };
    return this.http.post(url, body);
  }

  savePlaylist(playlist: Playlist): Observable<object> {
    const url = `${environment.baseUrl}/playlist/save`;
    const body = {
      playlist
    };
    return this.http.post(url, body);
  }

  generatePlaylist(spotifyTrackIds: string[]): Observable<object> {
    const url = `${environment.baseUrl}/playlist/generate`;
    const body = {
      spotifyTrackIds
    };
    return this.http.post(url, body);
  }
}
