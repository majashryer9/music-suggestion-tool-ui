import { Component, OnInit, Input } from '@angular/core';
import { Song } from 'src/app/models/Song';

@Component({
  selector: 'app-song-chip',
  templateUrl: './song-chip.component.html',
  styleUrls: ['./song-chip.component.scss']
})
export class SongChipComponent implements OnInit {

  @Input() data: Song;
  constructor() { }

  ngOnInit() {
  }

}
