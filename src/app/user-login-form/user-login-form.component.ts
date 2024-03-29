// src/app/user-login-form/user-login-form.component.ts

import { Component, OnInit, Input } from '@angular/core';

// Import router navigation
import { Router } from '@angular/router';

// Import to close the dialog on success
import { MatDialogRef } from '@angular/material/dialog';

// Import Api calls
import { FetchApiDataService } from '../fetch-api-data.service';

// Import to display notifications to the user
import { MatSnackBar } from '@angular/material/snack-bar';

/**
 * User Login Form Component
 */

@Component({
  selector: 'app-user-login-form',
  templateUrl: './user-login-form.component.html',
  styleUrls: ['./user-login-form.component.scss']
})
export class UserLoginFormComponent implements OnInit {


  /**
   * User Login Data
   */

  @Input() userData = { Username: '', Password: '' }


  /**
   * Constructor for UserLoginFormComponent
   * @param fetchApiData - Handles Api requests
   * @param dialogRef - References User Login Dialog
   * @param router - Angular router for navigation
   * @param snackbar - Displays MatSnackBar messages
   */

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserLoginFormComponent>,
    public router: Router,
    public snackbar: MatSnackBar
  ) { }

  ngOnInit(): void {
  }

  /////////////////////////API CALL TO LOG IN////////////////////////

  /**
   * Handles user log in.
   */

  loginUser(): void {
    this.fetchApiData.userLogin(this.userData).subscribe((response) => {
      localStorage.setItem('token', response.token);
      localStorage.setItem('user', JSON.stringify(response.user))
      this.dialogRef.close(); // This will close the modal on success!
      this.snackbar.open('Logged in successfully', response, {
        duration: 2000
      });
      this.router.navigate(['movies']);
    }, (error) => {
      this.snackbar.open('Failed to log in', error, {
        duration: 2000
      });
    });
  }

}
