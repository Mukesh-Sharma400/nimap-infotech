import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = 'http://localhost:5000';

  constructor(private http: HttpClient) { }

  getCategories(): Observable<any> {
    return this.http.get(`${this.baseUrl}/categories`);
  }

  addCategory(category: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/categories`, category);
  }

  updateCategory(categoryId: number, category: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/categories/${categoryId}`, category);
  }

  deleteCategory(categoryId: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/categories/${categoryId}`);
  }

  getProducts(offset: number, limit: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/products?page=${offset}&pageSize=${limit}`);
  }

  addProduct(product: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/products`, product);
  }

  updateProduct(productId: number, product: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/products/${productId}`, product);
  }

  deleteProduct(productId: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/products/${productId}`);
  }
}
