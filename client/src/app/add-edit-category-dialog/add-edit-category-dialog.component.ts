import { Component, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

interface Category {
  id?: number;
  name: string;
}

@Component({
  selector: 'app-add-edit-category-dialog',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './add-edit-category-dialog.component.html',
  styleUrls: ['./add-edit-category-dialog.component.css']
})
export class AddEditCategoryDialogComponent {
  category: Category = { name: '' };
  dialogTitle: string = 'Add Category';

  constructor(
    public dialogRef: MatDialogRef<AddEditCategoryDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    if (data.category) {
      this.dialogTitle = 'Edit Category';
      this.category = { ...data.category };
    }
  }

  onSubmit() {
    if (this.category.name.trim()) {
      this.dialogRef.close(this.category);
    } else {
      console.error('Category data is incomplete.');
      alert('Please provide a valid category name.');
    }
  }

  closeModal() {
    this.dialogRef.close();
  }
}
