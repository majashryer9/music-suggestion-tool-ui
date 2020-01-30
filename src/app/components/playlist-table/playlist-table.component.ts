import { Component, OnInit } from '@angular/core';
import { PlaylistService } from 'src/app/services/playlist.service';
import { Observer } from 'rxjs';
import { Song } from 'src/app/models/Song';

@Component({
  selector: 'app-playlist-table',
  templateUrl: './playlist-table.component.html',
  styleUrls: ['./playlist-table.component.scss']
})
export class PlaylistTableComponent implements OnInit {

  constructor(public playlistService: PlaylistService) { }

  ngOnInit() {
  }

  generatePlaylist(): void {
    const observer: Observer<Song[]> = {
      next: songs => {
        songs.forEach(song => this.playlistService.addSongToPlaylist(song));
        this.playlistService.savePlaylist({
          songs: this.playlistService.songs,
          imageUrl: this.playlistService.imageUrl
        }).subscribe();
      },
      error: () => { },
      complete: () => { }
    };
    this.playlistService.generatePlaylist(this.playlistService.songs.map(song => song.spotifyTrackId)).subscribe(observer);
  }
}
