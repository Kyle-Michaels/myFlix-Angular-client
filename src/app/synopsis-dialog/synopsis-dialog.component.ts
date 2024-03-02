import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

/**
 * Synopsis Dialog Component
 */

@Component({
  selector: 'app-synopsis-dialog',
  templateUrl: './synopsis-dialog.component.html',
  styleUrls: ['./synopsis-dialog.component.scss']
})
export class SynopsisDialogComponent implements OnInit {

  /**
   * Constructor for SynopsisDialogComponent
   * @param data - Injected data object containing movie title and description.
   */

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: { Title: string, Description: string }
  ) { }
  ngOnInit(): void {
  }
}
