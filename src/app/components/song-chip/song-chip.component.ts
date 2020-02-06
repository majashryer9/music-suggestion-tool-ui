import { Component, OnInit, Input, ViewChild, ElementRef, OnDestroy, Output, EventEmitter } from '@angular/core';
import { Song } from 'src/app/models/Song';
import { PlaylistService } from 'src/app/services/playlist.service';
import { AudioService } from 'src/app/services/audio.service';

@Component({
  selector: 'app-song-chip',
  templateUrl: './song-chip.component.html',
  styleUrls: ['./song-chip.component.scss']
})
export class SongChipComponent implements OnInit, OnDestroy {

  @Input() id: string;
  @Input() data: Song;
  @ViewChild('previewAudio', { static: false }) previewAudio: ElementRef<HTMLAudioElement>;
  hovering: boolean;
  constructor(public playlistService: PlaylistService, public audioService: AudioService) { }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.audioService.clearDataIfGivenSongIsPlaying(this.data.spotifyTrackId);
  }

  handleAudioClick(): void {
    this.audioService.playOrPause({
      ref: this.previewAudio,
      id: this.data.spotifyTrackId
    });
  }
}
