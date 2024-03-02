// src/app/welcome-page/welcome-page.components.ts

import { Component, OnInit } from '@angular/core';
import { UserLoginFormComponent } from '../user-login-form/user-login-form.component';
import { UserRegistrationFormComponent } from '../user-registration-form/user-registration-form.component';
import { MatDialog } from '@angular/material/dialog';

/**
 * Welcome page component
 */

@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.scss']
})
export class WelcomePageComponent implements OnInit {

  /**
   * Constructor for WelcomePageComponent.
   * @param dialog - Opens dialog components
   */

  constructor(public dialog: MatDialog) { }
  ngOnInit(): void {
  }


  /////////////////////////OPEN DIALOGS/////////////////////////

  /**
   * Opens UserRegistrationDialog
   */

  openUserRegistrationDialog(): void {
    this.dialog.open(UserRegistrationFormComponent, {
      width: '280px'
    });
  }

  /**
   * Opens UserLoginDialog
   */

  openUserLoginDialog(): void {
    this.dialog.open(UserLoginFormComponent, {
      width: '280px'
    });
  }
}
