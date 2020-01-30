import { Component, OnInit, AfterViewInit } from '@angular/core';
import { PlaylistService } from 'src/app/services/playlist.service';
import { Observer } from 'rxjs';

@Component({
  selector: 'app-playlist-image',
  templateUrl: './playlist-image.component.html',
  styleUrls: ['./playlist-image.component.scss']
})
export class PlaylistImageComponent implements OnInit, AfterViewInit {

  imageUrls: string[];
  selectedImageUrlIndex = 0;
  loading: boolean;
  constructor(private playlistService: PlaylistService) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.getPlaylistImageOptions();
  }

  setPlaylistImageUrlWithSelectedIndex(): void {
    this.playlistService.imageUrl = this.imageUrls[this.selectedImageUrlIndex];
  }

  getPlaylistImageOptions() {
    this.loading = true;
    const observer: Observer<string[]> = {
      next: imageUrls => {
        this.imageUrls = imageUrls;
        this.setPlaylistImageUrlWithSelectedIndex();
      },
      error: () => { },
      complete: () => { this.loading = false; }
    };
    this.playlistService.getPlaylistImage('nature').subscribe(observer);
  }

  getNewPlaylistImage() {
    this.selectedImageUrlIndex = (this.selectedImageUrlIndex + 1) % this.imageUrls.length;
    this.setPlaylistImageUrlWithSelectedIndex();
  }
}
