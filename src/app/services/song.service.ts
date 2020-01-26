import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SongService {

  constructor(private http: HttpClient) { }

  songSearch(searchTerm: string): Observable<object> {
    const body = {
      searchTerm
    };
    return this.http.post(`${environment.baseUrl}/song/spotify-song-search`, body);
  }

  getSuggestions(spotifyTrackIds: string[]): Observable<object> {
    const body = {
      spotifyTrackIds
    };
    return this.http.post(`${environment.baseUrl}/song/recommendations`, body);
  }
}
