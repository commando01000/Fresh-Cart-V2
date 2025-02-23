import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor(private _httpClient: HttpClient) {}

  myToken: any = {
    token: localStorage.getItem('token'),
  };

  cartNumber: BehaviorSubject<number> = new BehaviorSubject(0);

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
  getUserCart(): Observable<any> {
    return this._httpClient.get('https://ecommerce.routemisr.com/api/v1/cart', {
      headers: {
        token: localStorage.getItem('token') || '',
      },
    });
  }

  removeCartItem(itemId: string): Observable<any> {
    return this._httpClient.delete(
      `https://ecommerce.routemisr.com/api/v1/cart/${itemId}`,
      {
        headers: {
          token: localStorage.getItem('token') || '',
        },
      }
    );
  }

  updateCartItem(itemId: string, quantity: number): Observable<any> {
    return this._httpClient.put(
      `https://ecommerce.routemisr.com/api/v1/cart/${itemId}`,
      {
        count: quantity,
      },
      {
        headers: {
          token: localStorage.getItem('token') || '',
        },
      }
    );
  }

  clearCart(): Observable<any> {
    return this._httpClient.delete(
      'https://ecommerce.routemisr.com/api/v1/cart',
      {
        headers: {
          token: localStorage.getItem('token') || '',
        },
      }
    );
  }

  // Checkout
  checkout(cartId: string, orderForm: FormGroup): Observable<any> {
    return this._httpClient.post(
      `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:4200`,
      {
        shippingAddress: orderForm,
      },
      {
        headers: {
          token: localStorage.getItem('token') || '',
        },
      }
    );
  }
}
