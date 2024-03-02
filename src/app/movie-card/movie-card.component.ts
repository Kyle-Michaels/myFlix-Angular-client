// src/app/movie-card/movie-card.component.ts

import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from 'src/app/fetch-api-data.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { GenreDialogComponent } from 'src/app/genre-dialog/genre-dialog.component';
import { DirectorDialogComponent } from 'src/app/director-dialog/director-dialog.component';
import { SynopsisDialogComponent } from 'src/app/synopsis-dialog/synopsis-dialog.component';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent {
  movies: any[] = [];
  user: any = {};
  FavoriteMovies: any[] = []
  constructor(
    public fetchApiData: FetchApiDataService,
    public router: Router,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.getMovies();
    this.getUserData();
    console.log(this.user)
  }


  /////////////////////////BUILD PAGE/////////////////////////
  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((response: any) => {
      this.movies = response;
      console.log(response)
    });
  }

  getUserData(): void {
    this.user = this.fetchApiData.getUser();
    this.FavoriteMovies = this.user.FavoriteMovies;
  }


  /////////////////////////OPEN DIALOGS/////////////////////////
  openGenreDialog(name: string, description: string): void {
    this.dialog.open(GenreDialogComponent, {
      data: {
        Name: name,
        Description: description,
      },
      width: '500px'
    })
  }

  openDirectorDialog(name: string, birth: string, bio: string): void {
    this.dialog.open(DirectorDialogComponent, {
      data: {
        Name: name,
        Birth: birth,
        Bio: bio,
      },
      width: '500px'
    })
  }

  openSynopsisDialog(title: string, description: string): void {
    this.dialog.open(SynopsisDialogComponent, {
      data: {
        Title: title,
        Description: description,
      },
      width: '500px'
    })
  }


  /////////////////////////FAVORITE FUNCTIONS/////////////////////////
  isFav(movie: any): boolean {
    const user: any = this.fetchApiData.getUser()
    return user.FavoriteMovies.includes(movie._id) ? true : false
  }

  addToFavs(movie: any): void {
    this.fetchApiData.addToFavs(movie._id).subscribe((response) => {
      console.log(response);
      localStorage.setItem('user', JSON.stringify(response));
    })
  }

  removeFromFavs(movie: any): void {
    this.fetchApiData.removeFromFavs(movie._id).subscribe((response) => {
      console.log(response);
      localStorage.setItem('user', JSON.stringify(response));
    })
  }

  toggleFav(movie: any): void {
    this.isFav(movie) ? this.removeFromFavs(movie) : this.addToFavs(movie)
  }


  /////////////////////////ROUTING/////////////////////////
  signout(): void {
    localStorage.clear();
    this.router.navigate(['welcome'])
  }

  profile(): void {
    this.router.navigate(['profile'])
  }
}
