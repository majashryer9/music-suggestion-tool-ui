import { Injectable } from '@angular/core';
import { RefAndId } from '../models/RefAndId';

@Injectable({
  providedIn: 'root'
})
export class AudioService {

  refAndIdOfSongPlaying: RefAndId = { ref: null, id: '' };
  timeout;
  constructor() { }

  clearAudioData(): void {
    clearTimeout(this.timeout);
    this.refAndIdOfSongPlaying = { ref: null, id: '' };
  }

  pauseCurrentSongPlaying(): void {
    this.refAndIdOfSongPlaying.ref.nativeElement.pause();
    clearTimeout(this.timeout);
    this.refAndIdOfSongPlaying = { ref: null, id: '' };
  }

  playNewSong(refAndId: RefAndId): void {
    this.refAndIdOfSongPlaying = refAndId;
    this.refAndIdOfSongPlaying.ref.nativeElement.play();
    this.timeout = setTimeout(
      () => {
        this.refAndIdOfSongPlaying = { ref: null, id: '' };
      },
      (this.refAndIdOfSongPlaying.ref.nativeElement.duration - this.refAndIdOfSongPlaying.ref.nativeElement.currentTime) * 1000);
  }

  playOrPause(refAndId: RefAndId): void {
    if (this.refAndIdOfSongPlaying.ref) {
      // A song is currently playing
      if (this.refAndIdOfSongPlaying.id === refAndId.id) {
        // Pause the song playing
        this.pauseCurrentSongPlaying();
      } else {
        // First pause the song playing then play the new song
        this.pauseCurrentSongPlaying();
        this.playNewSong(refAndId);
      }
    } else {
      // No song is currently playing
      this.playNewSong(refAndId);
    }
  }
}
