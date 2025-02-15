import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor(private _httpClient: HttpClient) {}

  myToken: any = {
    token: localStorage.getItem('token'),
  };

  addToCart(productId: string): Observable<any> {
    return this._httpClient.post(
      'https://ecommerce.routemisr.com/api/v1/cart',
      {
        productId: productId,
      },
      {
        headers: {
          token: localStorage.getItem('token') || '',
        },
      }
    );
  }
}
