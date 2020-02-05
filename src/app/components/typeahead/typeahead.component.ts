import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Subscription, Observer, Observable } from 'rxjs';
import { switchMap, debounceTime } from 'rxjs/operators';
import { Song } from 'src/app/models/Song';

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
  @Output() searchResultSelected = new EventEmitter();
  @Input() search: (searchTerm: string) => Observable<object>;
  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    const observer: Observer<Song[]> = {
      next: searchResults => this.searchResults = searchResults,
      error: () => { },
      complete: () => { }
    };
    this.subscription = this.searchForm.get('searchTerm').valueChanges.pipe(
      debounceTime(300),
      switchMap(value => this.search(value))
    )
      .subscribe(observer);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
