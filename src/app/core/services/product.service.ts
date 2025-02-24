import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private _httpClient: HttpClient) {}
  getProducts(pageNumber: number = 1) {
    return this._httpClient.get(
      `https://ecommerce.routemisr.com/api/v1/products?page=${pageNumber}`
    );
  }

  getCategories() {
    return this._httpClient.get(
      'https://ecommerce.routemisr.com/api/v1/categories'
    );
  }

  getProductDetails(id: string) {
    return this._httpClient.get(
      `https://ecommerce.routemisr.com/api/v1/products/${id}`
    );
  }
}
