import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SongService {

  constructor(private http: HttpClient) { }

  songSearch(searchTerm: string, spotifySearch: boolean): Observable<object> {
    const body = {
      searchTerm
    };
    const url = `${environment.baseUrl}/song/${spotifySearch ? 'spotify-song-search' : 'search'}`;
    return this.http.post(url, body);
  }

  getSuggestions(spotifyTrackIds: string[]): Observable<object> {
    const body = {
      spotifyTrackIds
    };
    return this.http.post(`${environment.baseUrl}/song/recommendations`, body);
  }
}
