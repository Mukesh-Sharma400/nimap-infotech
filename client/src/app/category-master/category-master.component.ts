import { ApiService } from '../api.service';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddEditCategoryDialogComponent } from '../add-edit-category-dialog/add-edit-category-dialog.component';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';


interface Category {
  id: number;
  name: string;
}

@Component({
  selector: 'app-category-master',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './category-master.component.html',
  styleUrl: './category-master.component.css'
})
export class CategoryMasterComponent implements OnInit {

  categories: Category[] = [];

  constructor(private apiService: ApiService, private dialog: MatDialog, private snackBar: MatSnackBar) { }


  ngOnInit() {
    this.fetchCategories();
  }

  fetchCategories() {
    this.apiService.getCategories().subscribe((data: any) => {
      this.categories = data;
    });
  }

  openAddOrEditCategoryModal(category?: Category) {
    const dialogRef = this.dialog.open(AddEditCategoryDialogComponent, {
      data: {
        category: category || null
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (category) {
          this.apiService.updateCategory(category.id, result).subscribe(
            response => {
              this.snackBar.open('Category Updated', 'Close', {
                duration: 3000,
              });
              this.fetchCategories();
            },
            error => {
              console.error('Error updating category:', error);
            }
          );
        } else {
          this.apiService.addCategory(result).subscribe(
            response => {
              this.snackBar.open('Category Added', 'Close', {
                duration: 3000,
              });
              this.fetchCategories();
            },
            error => {
              console.error('Error adding category:', error);
            }
          );
        }
      }
    });
  }

  openDeleteCategoryModal(categoryId?: number) {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      data: {
        id: categoryId, title: 'Category'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (categoryId) {
          this.apiService.deleteCategory(categoryId).subscribe(
            response => {
              this.snackBar.open('Category Deleted', 'Close', {
                duration: 3000,
              });
              this.fetchCategories();
            },
            error => {
              console.error('Error deleting product:', error);
            }
          );
        }
      }
    });
  }
}
