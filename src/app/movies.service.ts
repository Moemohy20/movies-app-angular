import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MoviesService {
  constructor(private _HttpClient: HttpClient) {}

  getTrending(mediaType: string): Observable<any> {
    return this._HttpClient.get(
      `https://api.themoviedb.org/3/trending/${mediaType}/week?api_key=de3d78d5796f7354ed1df642517feb94`
    );
  }
  getMoviesDetails(id: string): Observable<any> {
    return this._HttpClient.get(
      `https://api.themoviedb.org/3/movie/${id}?api_key=de3d78d5796f7354ed1df642517feb94&language=en-US`
    );
  }
}
