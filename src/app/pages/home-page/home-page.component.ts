import { Component, OnInit } from '@angular/core';
import { Observer } from 'rxjs';
import { Playlist } from 'src/app/models/Playlist';
import { PlaylistService } from 'src/app/services/playlist.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  playlists: Playlist[] = [];
  // The timestamp of the last retrieved playlist from getNextNPlaylists. This is used for infinite scrolling.
  lastTimestamp = 0;
  constructor(private playlistService: PlaylistService) { }

  ngOnInit() {
    this.getNPlaylists();
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
