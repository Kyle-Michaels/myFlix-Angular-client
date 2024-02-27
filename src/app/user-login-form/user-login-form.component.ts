// src/app/user-login-form/user-login-form.component.ts

import { Component, OnInit, Input } from '@angular/core';

// Import to close the dialog on success
import { MatDialogRef } from '@angular/material/dialog';

// Import Api calls
import { FetchApiDataService } from '../fetch-api-data.service';

// Import to display notifications to the user
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-login-form',
  templateUrl: './user-login-form.component.html',
  styleUrls: ['./user-login-form.component.scss']
})
export class UserLoginFormComponent implements OnInit {

  @Input() userData = { Username: '', Password: '' }

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserLoginFormComponent>,
    public snackbar: MatSnackBar) { }

  ngOnInit(): void {
  }

  // This is the function responsible for sending the form inputs to the backend
  loginUser(): void {
    this.fetchApiData.userLogin(this.userData).subscribe((result) => {
      //Logic for a successful user login goes here! (TODO)
      this.dialogRef.close(); // This will close the modal on success!
      this.snackbar.open(result, 'OK', {
        duration: 2000
      });
    }, (result) => {
      this.snackbar.open(result, 'OK', {
        duration: 2000
      });
    });
  }

}
