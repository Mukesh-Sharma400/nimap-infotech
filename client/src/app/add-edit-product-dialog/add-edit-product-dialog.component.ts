import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

interface Category {
  id: number;
  name: string;
}

interface Product {
  id?: number;
  name: string;
  categoryId: number | null;
}

@Component({
  selector: 'app-edit-add-product-dialog',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-edit-product-dialog.component.html',
  styleUrls: ['./add-edit-product-dialog.component.css']
})
export class AddEditProductDialogComponent implements OnInit {
  product: Product = { name: '', categoryId: null };
  categories: Category[] = [];
  dialogTitle: string = 'Add Product';

  constructor(
    public dialogRef: MatDialogRef<AddEditProductDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.categories = data.categories;
    if (data.product) {
      this.dialogTitle = 'Edit Product';
      this.product = { ...data.product };
    }
  }

  ngOnInit() { }

  onSubmit() {
    if (this.product.name && this.product.categoryId != null) {
      this.dialogRef.close(this.product);
    } else {
      console.error('Product data is incomplete.');
    }
  }

  closeModal() {
    this.dialogRef.close();
  }
}
