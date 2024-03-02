import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

/**
 * Genre Dialog Component
 */

@Component({
  selector: 'app-genre-dialog',
  templateUrl: './genre-dialog.component.html',
  styleUrls: ['./genre-dialog.component.scss']
})
export class GenreDialogComponent implements OnInit {

  /**
   * Constructor for GenreDialogComponent
   * @param data - Injected data object containing genre name and description.
   */

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: { Name: string, Description: string }
  ) { }
  ngOnInit(): void {
  }
}
