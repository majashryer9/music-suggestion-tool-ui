import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Subscription, Observer } from 'rxjs';
import { switchMap, debounceTime } from 'rxjs/operators';
import { Song } from 'src/app/models/Song';
import { SongService } from 'src/app/services/song.service';
import { PlaylistService } from 'src/app/services/playlist.service';

@Component({
  selector: 'app-typeahead',
  templateUrl: './typeahead.component.html',
  styleUrls: ['./typeahead.component.scss']
})
export class TypeaheadComponent implements OnInit, OnDestroy {

  searchForm = this.fb.group({
    searchTerm: ['']
  });
  subscription: Subscription;
  searchResults: Song[] = [];
  showSearchResults: boolean;
  constructor(private fb: FormBuilder, private songService: SongService, public playlistService: PlaylistService) { }

  ngOnInit() {
    const observer: Observer<Song[]> = {
      next: searchResults => this.searchResults = searchResults,
      error: () => { },
      complete: () => { }
    };
    this.subscription = this.searchForm.get('searchTerm').valueChanges.pipe(
      debounceTime(200),
      switchMap(value => this.songService.songSearch(value))
    )
      .subscribe(observer);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
