import { Injectable } from '@angular/core';
import { Song } from '../models/Song';
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
  constructor(private http: HttpClient) { }

  addSongToPlaylist(songToAdd: Song): void {
    // Only add if song isn't already in the array
    if (!this.songs.some(song => song.spotifyTrackId === songToAdd.spotifyTrackId)) {
      this.songs.unshift(songToAdd);
    }
    // TODO: Error message if they try to add the same song more than once
  }

  removeSongFromPlaylist(idOfSongToRemove: string): void {
    this.songs = this.songs.filter(song => song.spotifyTrackId !== idOfSongToRemove);
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

  getNextNPlaylists(lastTimestamp: number): Observable<any> {
    const url = `${environment.baseUrl}/playlist/get-next`;
    const body = {
      n: 10,
      lastTimestamp
    };
    return this.http.post(url, body);
  }
}
