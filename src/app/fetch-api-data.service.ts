import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';

const apiUrl = 'https://my-flix-4e112dcd3c89.herokuapp.com/';
@Injectable({
  providedIn: 'root'
})


export class FetchApiDataService {
  /**
   * Injects the HttpClient module to the constructor params
   * @param {HttpClient} http HttpClient instance.
   */
  constructor(private http: HttpClient) {
  }

  /**
   * Api call to register a new user.
   * @param {any} userDetails - User details inputted on registration form. 
   * @returns {Observable<any>} Observable containing server response.
   */

  public userRegistration(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http.post(apiUrl + 'users', userDetails).pipe(
      catchError(this.handleError));
  }

  /**
   * Api call to log in.
   * @param {any} userDetails - User details inputted on log in form.
   * @returns {Observable<any>} Obvervable containing server response.
   */

  public userLogin(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http.post(apiUrl + 'login', userDetails).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Api call to get all movies.
   * @returns {Observable<any>} Observable containing a list of all movies.
   */

  getAllMovies(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'movies', {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  /**
   * Api call to fetch movie details by title.
   * @param {string} movieTitle - Movie title.
   * @returns {Observable<any>} Observable containing movie details.
   */

  getMovie(movieTitle: any): Observable<any> {
    const token = localStorage.getItem('token');
    console.log(movieTitle);
    return this.http.get(apiUrl + 'movies/' + movieTitle, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  /**
   * Api call to fetch director details by name.
   * @param {string} directorName - Director name.
   * @returns {Observable<any>} Observable containing director details.
   */

  getDirector(directorName: any): Observable<any> {
    const token = localStorage.getItem('token');
    console.log(directorName);
    return this.http.get(apiUrl + 'movies/directors/' + directorName, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  /**
   * Api call to fetch genre details by name.
   * @param {string} genreName - Genre name.
   * @returns {Observable<any>} Observable containing genre details.
   */

  getGenre(genreName: any): Observable<any> {
    const token = localStorage.getItem('token');
    console.log(genreName);
    return this.http.get(apiUrl + 'movies/genre/' + genreName, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  /**
   * Fetches user details from localStorage.
   * @returns {Observable<any>} Observable containing user details.
   */

  getUser(): Observable<any> {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    return user;
  }

  /**
   * Fetches favorite movies of user stored in localStorage.
   * @returns {Observable<any>} Observable containing user's favorite movies.
   */

  getFavorites(): Observable<any> {
    const user = JSON.parse(localStorage.getItem('user') || '{}')
    const favs = user.FavoriteMovies;
    return favs;
  }

  /**
   * Api call to add a movie to user's favorite movie list.
   * @param {string} movieID - Movie id.
   * @returns {Observable<any>} Observable containing server response.
   */

  addToFavs(movieID: any): Observable<any> {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const token = localStorage.getItem('token');
    return this.http.post(apiUrl + 'users/' + user.Username + '/movies/' + movieID, null, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  /**
   * Api call to update user's data.
   * @param {any} userData - The updated user data.
   * @returns {Observable<any>} Observable containing server response.
   */

  editUser(userData: any): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.put(apiUrl + 'users/' + userData.Username, userData, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  /**
   * Api call to delete user.
   * @returns {Observable<any>} Observable containing server response.
   */

  deleteUser(): Observable<any> {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const token = localStorage.getItem('token');
    console.log(user);
    return this.http.delete(apiUrl + 'users/' + user.Username, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  /**
   * Api call to remove a movie from user's favorite movies list.
   * @param {string} movieID - Movie id. 
   * @returns {Observable<any>} Observable containing server response.
   */

  removeFromFavs(movieID: any): Observable<any> {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const token = localStorage.getItem('token');
    console.log(user);
    return this.http.delete(apiUrl + 'users/' + user.Username + '/movies/' + movieID, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  /**
   * Extracts and returns data from response.
   * @param {any} res - Response object.
   * @returns {any} The extracted data.
   */

  private extractResponseData(res: any): any {
    const body = res;
    return body || {};
  }

  /**
   * Error handling
   * @param {HttpErrorResponse} error - Error object. 
   * @returns {Observable<never>} Throws an observable error.
   * @private
   */

  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('Some error occurred:', error.error.message);
    } else {
      console.error(
        `Error Status code ${error.status}, ` +
        `Error body is: ${error.error}`);
      console.log(error.error)
    }
    return throwError(error.error);
  }

}
