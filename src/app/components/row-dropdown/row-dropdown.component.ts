import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { Song } from 'src/app/models/Song';
import { SongService } from 'src/app/services/song.service';
import { Observer } from 'rxjs';
import { CarouselItem } from 'src/app/models/CarouselItem';
import { SongChipComponent } from '../song-chip/song-chip.component';

@Component({
  selector: 'app-row-dropdown',
  templateUrl: './row-dropdown.component.html',
  styleUrls: ['./row-dropdown.component.scss'],
  animations: [
    trigger('openClose', [
      state('open', style({
        height: '200px'
      })),
      state('closed', style({
        height: '0px',
      })),
      transition('open => closed', [
        animate('0.5s')
      ]),
      transition('closed => open', [
        animate('0.5s')
      ])
    ])
  ]
})
export class RowDropdownComponent implements OnInit, OnChanges {

  @Input() spotifyTrackId: string;
  @Input() showSuggestions: boolean;
  carouselItems: CarouselItem<Song, SongChipComponent>[] = [];
  loading: boolean;
  constructor(private songService: SongService) { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    for (const key in changes) {
      if (key === 'showSuggestions' && changes[key].currentValue && !this.carouselItems.length) {
        this.getSuggestions();
      }
    }
  }

  getSuggestions(): void {
    this.loading = true;
    const observer: Observer<Song[]> = {
      next: songSuggestions => {
        this.carouselItems = songSuggestions.map(song => ({ id: song.spotifyTrackId, data: song, component: SongChipComponent }));
      },
      error: () => { },
      complete: () => { this.loading = false; }
    };
    this.songService.getSuggestions([this.spotifyTrackId]).subscribe(observer);
  }
}
