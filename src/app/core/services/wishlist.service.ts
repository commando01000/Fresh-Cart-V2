import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WishlistService {
  constructor(private _httpClient: HttpClient) {}

  wishlistNumber: BehaviorSubject<number> = new BehaviorSubject(0);

  addToWishlist(productId: string): Observable<any> {
    return this._httpClient.post(
      'https://ecommerce.routemisr.com/api/v1/wishlist',
      {
        productId: productId,
      }
    );
  }
  removeFromWishlist(productId: string): Observable<any> {
    return this._httpClient.delete(
      `https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`
    );
  }

  getWishlistItems(): Observable<any> {
    return this._httpClient.get(
      'https://ecommerce.routemisr.com/api/v1/wishlist'
    );
  }
}
