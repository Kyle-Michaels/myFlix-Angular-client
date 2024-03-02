import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

/**
 * Director Dialog Component
 */

@Component({
  selector: 'app-director-dialog',
  templateUrl: './director-dialog.component.html',
  styleUrls: ['./director-dialog.component.scss']
})
export class DirectorDialogComponent implements OnInit {

  /**
   * Constructor for DirectorDialogComponent
   * @param data - Injected data object containing director name, birth, and bio.
   */

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: { Name: string, Birth: string, Bio: string }
  ) { }
  ngOnInit(): void {
  }
}