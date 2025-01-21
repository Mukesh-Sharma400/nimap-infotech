import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-dialog',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './delete-dialog.component.html',
  styleUrl: './delete-dialog.component.css'
})
export class DeleteDialogComponent implements OnInit {
  dialogTitle: string = '';


  constructor(
    public dialogRef: MatDialogRef<DeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.dialogTitle = data.title;
  }

  ngOnInit() { }

  onSubmit() {
    this.dialogRef.close(this.data.id);
  }

  closeModal() {
    this.dialogRef.close();
  }

}
