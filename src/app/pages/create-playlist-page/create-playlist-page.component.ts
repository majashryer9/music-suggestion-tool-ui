import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { SongService } from 'src/app/services/song.service';
import { PlaylistService } from 'src/app/services/playlist.service';

@Component({
  selector: 'app-create-playlist-page',
  templateUrl: './create-playlist-page.component.html',
  styleUrls: ['./create-playlist-page.component.scss']
})
export class CreatePlaylistPageComponent implements OnInit {

  search: (searchTerm: string) => Observable<object>;
  constructor(private songService: SongService, public playlistService: PlaylistService) { }

  ngOnInit() {
    this.search = (searchTerm) => this.songService.songSearch(searchTerm, true);
  }
}
