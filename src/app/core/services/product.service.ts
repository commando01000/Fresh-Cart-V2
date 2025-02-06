import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private _httpClient: HttpClient) {}
  getProducts() {
    return this._httpClient.get(
      'https://ecommerce.routemisr.com/api/v1/products'
    );
  }

  getCategories() {
    return this._httpClient.get(
      'https://ecommerce.routemisr.com/api/v1/categories'
    );
  }
}
