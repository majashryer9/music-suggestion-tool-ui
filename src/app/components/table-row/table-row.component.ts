import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { Song } from 'src/app/models/Song';
import { AudioService } from 'src/app/services/audio.service';
import { PlaylistService } from 'src/app/services/playlist.service';

@Component({
  selector: 'app-table-row',
  templateUrl: './table-row.component.html',
  styleUrls: ['./table-row.component.scss']
})
export class TableRowComponent implements OnInit {

  @Input() song: Song;
  @ViewChild('previewAudio', { static: false }) previewAudio: ElementRef<HTMLAudioElement>;
  showSuggestions: boolean;
  constructor(public playlistService: PlaylistService, public audioService: AudioService) { }

  ngOnInit() {
  }

  handleAudioClick(): void {
    this.audioService.playOrPause({
      ref: this.previewAudio,
      id: this.song.spotifyTrackId
    });
  }
}
