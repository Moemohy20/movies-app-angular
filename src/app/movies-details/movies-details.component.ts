import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MoviesService } from '../movies.service';

@Component({
  selector: 'app-movies-details',
  templateUrl: './movies-details.component.html',
  styleUrls: ['./movies-details.component.scss'],
})
export class MoviesDetailsComponent implements OnInit {
  id: string = '';
  movieDetail: any = {};
  imgPrefix: string = 'https://image.tmdb.org/t/p/w500';

  constructor(
    private _ActivatedRoute: ActivatedRoute,
    private _MoviesService: MoviesService
  ) {
    this.id = this._ActivatedRoute.snapshot.params['id'];
  }

  ngOnInit(): void {
    this._MoviesService.getMoviesDetails(this.id).subscribe((response) => {
      this.movieDetail = response;
    });
  }
}
