import { Component, OnInit } from '@angular/core';
import { Observer, Observable } from 'rxjs';
import { Playlist } from 'src/app/models/Playlist';
import { PlaylistService } from 'src/app/services/playlist.service';
import { SongService } from 'src/app/services/song.service';
import { Song } from 'src/app/models/Song';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  playlists: Playlist[] = [];
  // The timestamp of the last retrieved playlist from getNextNPlaylists. This is used for infinite scrolling.
  lastTimestamp = 0;
  search: (searchTerm: string) => Observable<object>;
  constructor(private playlistService: PlaylistService, private songService: SongService) { }

  ngOnInit() {
    this.getNPlaylists();
    this.search = (searchTerm) => this.songService.songSearch(searchTerm, false);
  }

  getAllPlaylistsContainingSong(song: Song): void {
    const observer: Observer<Playlist[]> = {
      next: playlists => {
        this.playlists = playlists;
        this.lastTimestamp = 0;
      },
      complete: () => { },
      error: () => { }
    };
    this.playlistService.getAllPlaylistsContainingSongs([song.spotifyTrackId]).subscribe(observer);
  }

  getNPlaylists(): void {
    const observer: Observer<Playlist[]> = {
      next: playlists => {
        this.playlists = this.playlists.concat(playlists);
        this.lastTimestamp = playlists.length ? playlists[playlists.length - 1].timestamp : null;
      },
      complete: () => { },
      error: () => { }
    };
    this.playlistService.getNextNPlaylists(this.lastTimestamp).subscribe(observer);
  }
}
