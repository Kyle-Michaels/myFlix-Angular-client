import { Component, OnInit, Input } from '@angular/core';
import { FetchApiDataService } from 'src/app/fetch-api-data.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { GenreDialogComponent } from 'src/app/genre-dialog/genre-dialog.component';
import { DirectorDialogComponent } from 'src/app/director-dialog/director-dialog.component';
import { SynopsisDialogComponent } from 'src/app/synopsis-dialog/synopsis-dialog.component';


@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss']
})
export class ProfilePageComponent {

  @Input() userData = { Username: '', Password: '', Email: '', Birthday: '' };

  favoriteMovies: any[] = [];
  userFavs: any[] = [];
  movies: any[] = [];
  user: any = {}

  constructor(
    public fetchApiData: FetchApiDataService,
    public router: Router,
    public snackBar: MatSnackBar,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.getUserData();
    this.getMovies();
    console.log(this.user);
  }


  /////////////////////////BUILD PAGE/////////////////////////
  getUserData(): void {
    this.user = this.fetchApiData.getUser();
    this.favoriteMovies = this.user.FavoriteMovies;
  }

  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((response: any) => {
      this.movies = response;
      this.userFavs = this.movies.filter((m) => this.favoriteMovies.includes(m._id));
    })
  }


  /////////////////////////UPDATE USER/////////////////////////
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
      this.getUserData();
      this.getMovies();
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

  home(): void {
    this.router.navigate(['movies'])
  }
}
