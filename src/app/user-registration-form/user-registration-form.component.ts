// src/app/user-registration-form/user-registration-form.component.ts

import { Component, OnInit, Input } from '@angular/core';

// Import to close the dialog on success
import { MatDialogRef } from '@angular/material/dialog';

// Import Api calls
import { FetchApiDataService } from '../fetch-api-data.service';

// Import to display notifications to the user
import { MatSnackBar } from '@angular/material/snack-bar';

/**
 * User Registration Form Component
 */

@Component({
  selector: 'app-user-registration-form',
  templateUrl: './user-registration-form.component.html',
  styleUrls: ['./user-registration-form.component.scss']
})
export class UserRegistrationFormComponent implements OnInit {

  /**
   * User registration data
   */

  @Input() userData = { Username: '', Password: '', Email: '', Birthday: '' };

  /**
   * Constructor for UserRegistrationFormComponent
   * @param fetchApiData - Handles Api requests
   * @param dialogRef - References User Registration Dialog
   * @param snackBar - Displays MatSnackBar messages
   */

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserRegistrationFormComponent>,
    public snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
  }

  /////////////////////////API CALL TO REGISTER USER////////////////////////

  /**
   * Handles user registration.
   */

  registerUser(): void {
    this.fetchApiData.userRegistration(this.userData).subscribe((result) => {
      this.dialogRef.close(); // This will close the modal on success!
      this.snackBar.open(result, 'OK', {
        duration: 2000
      });
    }, (result) => {
      this.snackBar.open(result, 'OK', {
        duration: 20000
      });
    });
  }

}
