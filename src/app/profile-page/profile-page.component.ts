import { Component, OnInit, Input } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { GenreDialogComponent } from '../genre-dialog/genre-dialog.component';
import { DirectorDialogComponent } from '../director-dialog/director-dialog.component';
import { SynopsisDialogComponent } from '../synopsis-dialog/synopsis-dialog.component';

/**
 * Profile Page Component
 */

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss']
})
export class ProfilePageComponent {

  /**
   * User data
   */

  @Input() userData = { Username: '', Password: '', Email: '', Birthday: '' };

  /**
   * Component properties
   */

  favoriteMovies: any[] = [];
  userFavs: any[] = [];
  movies: any[] = [];
  user: any = {}

  /**
   * Constructor for ProfilePageComponent
   * @param fetchApiData - Handles Api requests
   * @param router - Angular router for navigation
   * @param snackBar - Displays MatSnackBar messages
   * @param dialog - Opens dialog components
   */

  constructor(
    public fetchApiData: FetchApiDataService,
    public router: Router,
    public snackBar: MatSnackBar,
    public dialog: MatDialog
  ) { }

  /**
   * Angular lifecycle hook that initializes the component
   * This method is called once component is initialized.
   */

  ngOnInit(): void {
    this.getUserData();
    this.getMovies();
    console.log(this.user);
  }


  /////////////////////////BUILD PAGE/////////////////////////

  /**
   * Gets user data
   */

  getUserData(): void {
    this.user = this.fetchApiData.getUser();
    this.favoriteMovies = this.user.FavoriteMovies;
  }

  /**
   * Gets all movies and filters list to contain only favorite movies
   */

  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((response: any) => {
      this.movies = response;
      this.userFavs = this.movies.filter((m) => this.favoriteMovies.includes(m._id));
    })
  }


  /////////////////////////UPDATE USER/////////////////////////

  /**
   * Updates user details
   */

  updateUser(): void {
    this.fetchApiData.editUser(this.userData).subscribe((result) => {
      console.log('Updated user:', result);
      localStorage.setItem('user', JSON.stringify(result));
      this.getUserData();
      this.snackBar.open('User update successfull', 'OK', {
        duration: 2000
      });
    }, (error) => {
      this.snackBar.open('Unable to update user:', error, {
        duration: 2000
      })
    });
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
      this.getUserData();
      this.getMovies();
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
   * Re-directs to home page.
   */

  home(): void {
    this.router.navigate(['movies'])
  }
}
