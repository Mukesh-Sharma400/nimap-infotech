import { FormsModule } from '@angular/forms';
import { ApiService } from './../api.service';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';
import { AddEditProductDialogComponent } from '../add-edit-product-dialog/add-edit-product-dialog.component';

interface Product {
  id: number;
  name: string;
  category: {
    id: number;
    name: string;
  };
}

interface Category {
  id: number;
  name: string;
}

@Component({
  selector: 'app-product-master',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './product-master.component.html',
  styleUrl: './product-master.component.css'
})
export class ProductMasterComponent implements OnInit {
  products: Product[] = [];
  categories: Category[] = [];
  currentPage = 1;
  pageSize = 10;
  hasNextPage = false;

  isModalOpen = false;
  product = { name: '', categoryId: null };

  constructor(private apiService: ApiService, private dialog: MatDialog, private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.fetchProducts();
    this.fetchCategories();
  }

  fetchProducts() {
    this.apiService.getProducts(this.currentPage, this.pageSize).subscribe((data: any) => {
      this.products = data.data;
      this.hasNextPage = data.currentPage < data.totalPages;
    });
  }

  fetchCategories() {
    this.apiService.getCategories().subscribe((data: any) => {
      this.categories = data;
    });
  }

  openAddOrEditProductModal(product?: Product) {
    const dialogRef = this.dialog.open(AddEditProductDialogComponent, {
      data: {
        categories: this.categories,
        product: product || null
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (product) {
          this.apiService.updateProduct(product.id, result).subscribe(
            response => {
              this.snackBar.open('Product Updated', 'Close', {
                duration: 3000,
              });
              this.fetchProducts();
            },
            error => {
              console.error('Error updating product:', error);
            }
          );
        } else {
          this.apiService.addProduct(result).subscribe(
            response => {
              this.snackBar.open('Product Added', 'Close', {
                duration: 3000,
              });
              this.fetchProducts();
            },
            error => {
              console.error('Error adding product:', error);
            }
          );
        }
      }
    });
  }


  openDeleteProductModal(productId?: number) {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      data: {
        id: productId, title: 'Product'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (productId) {
          this.apiService.deleteProduct(productId).subscribe(
            response => {
              this.snackBar.open('Product Deleted', 'Close', {
                duration: 3000,
              });
              this.fetchProducts();
            },
            error => {
              console.error('Error deleting product:', error);
            }
          );
        }
      }
    });
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.fetchProducts();
    }
  }

  nextPage() {
    if (this.hasNextPage) {
      this.currentPage++;
      this.fetchProducts();
    }
  }
}
