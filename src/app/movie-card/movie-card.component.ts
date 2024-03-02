// src/app/movie-card/movie-card.component.ts

import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from 'src/app/fetch-api-data.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { GenreDialogComponent } from 'src/app/genre-dialog/genre-dialog.component';
import { DirectorDialogComponent } from 'src/app/director-dialog/director-dialog.component';
import { SynopsisDialogComponent } from 'src/app/synopsis-dialog/synopsis-dialog.component';

/**
 * Movie Card Component
 */

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent {

  /**
   * Component properties
   */

  movies: any[] = [];
  user: any = {};
  FavoriteMovies: any[] = []

  /**
   * Constructor for MovieCardComponent
   * @param fetchApiData - Handles Api requests
   * @param router - Angular router for navigation
   * @param dialog - Opens dialog components
   */

  constructor(
    public fetchApiData: FetchApiDataService,
    public router: Router,
    public dialog: MatDialog,
  ) { }

  /**
   * Angular lifecycle hook that initializes the component
   * This method is called once component is initialized.
   */

  ngOnInit(): void {
    this.getMovies();
    this.getUserData();
    console.log(this.user)
  }


  /////////////////////////BUILD PAGE/////////////////////////

  /**
   * Gets all movies
   */

  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((response: any) => {
      this.movies = response;
      console.log(response)
    });
  }

  /**
   * Gets user data
   */

  getUserData(): void {
    this.user = this.fetchApiData.getUser();
    this.FavoriteMovies = this.user.FavoriteMovies;
  }


  /////////////////////////OPEN DIALOGS/////////////////////////

  /**
   * Opens Genre Dialog
   * @param {string} name - Genre name.
   * @param {string} description - Genre description.
   */

  openGenreDialog(name: string, description: string): void {
    this.dialog.open(GenreDialogComponent, {
      data: {
        Name: name,
        Description: description,
      },
      width: '500px'
    })
  }

  /**
   * Opens Director Dialog
   * @param {string} name - Director name.
   * @param {string} birth - Director birth data and/if death date.
   * @param {string} bio - Director bio
   */

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

  /**
   * Opens Synopsis Dialog
   * @param {string} title - Movie title.
   * @param {string} description - Movie description.
   */

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

  /**
   * Check if movie is in user's favorite movies list.
   * @param movie - Movie object containing movie data
   * @returns true if movie is in user's favorite movies list
   */

  isFav(movie: any): boolean {
    const user: any = this.fetchApiData.getUser()
    return user.FavoriteMovies.includes(movie._id) ? true : false
  }

  /**
   * Adds movie to user's favorite movies list.
   * @param movie - Movie object containing movie data
   */

  addToFavs(movie: any): void {
    this.fetchApiData.addToFavs(movie._id).subscribe((response) => {
      console.log(response);
      localStorage.setItem('user', JSON.stringify(response));
    })
  }

  /**
   * Removes movie from user's favorite movies list.
   * @param movie - Movie object containing movie data.
   */

  removeFromFavs(movie: any): void {
    this.fetchApiData.removeFromFavs(movie._id).subscribe((response) => {
      console.log(response);
      localStorage.setItem('user', JSON.stringify(response));
    })
  }

  /**
   * Calls add or remove from favorites depending if movie is on user's favorite movies list.
   * @param movie - Movie object containg movie data.
   */

  toggleFav(movie: any): void {
    this.isFav(movie) ? this.removeFromFavs(movie) : this.addToFavs(movie)
  }


  /////////////////////////ROUTING/////////////////////////

  /**
   * Signs out user and re-directs to welcome page.
   */

  signout(): void {
    localStorage.clear();
    this.router.navigate(['welcome'])
  }

  /**
   * Re-directs to profile page.
   */

  profile(): void {
    this.router.navigate(['profile'])
  }
}
