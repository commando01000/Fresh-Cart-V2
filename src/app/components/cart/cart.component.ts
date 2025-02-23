import { Component, OnInit, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from 'src/app/core/services/cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  /**
   *
   */
  constructor(
    private _cartService: CartService,
    private toastr: ToastrService,
    private _renderer2: Renderer2
  ) {}

  cartDetails: any = null;
  ngOnInit(): void {
    this._cartService.getUserCart().subscribe({
      next: (response) => {
        this.cartDetails = response.data;
      },
      error: (error) => {
        console.log(error);
      },
      complete: () => {},
    });
  }

  removeItem(itemId: string, btn: HTMLButtonElement): void {
    // disable button to prevent multiple clicks
    this._renderer2.setAttribute(btn, 'disabled', 'true');
    this._cartService.removeCartItem(itemId).subscribe({
      next: (response) => {
        this.toastr.success(response.message, 'Success');
        this._renderer2.setAttribute(btn, 'disabled', 'false');
        this.cartDetails = response.data;
      },
      error: (error) => {
        this.toastr.error(error.error.message, 'Error');
        this._renderer2.setAttribute(btn, 'disabled', 'false');
      },
      complete: () => {},
    });
  }

  updateCart(itemId: string, quantity: number, btn: HTMLButtonElement): void {
    // disable button to prevent multiple clicks
    if (quantity < 1) return;
    this._renderer2.setAttribute(btn, 'disabled', 'true');
    this._cartService.updateCartItem(itemId, quantity).subscribe({
      next: (response) => {
        this.toastr.success(response.message, 'Success');
        this._renderer2.setAttribute(btn, 'disabled', 'false');
        this.cartDetails = response.data;
      },
      error: (error) => {
        this.toastr.error(error.error.message, 'Error');
        this._renderer2.setAttribute(btn, 'disabled', 'false');
      },
      complete: () => {},
    });
  }

  clearCart(clearCartBtn: HTMLButtonElement): void {
    this._renderer2.setAttribute(clearCartBtn, 'disabled', 'true');
    this._cartService.clearCart().subscribe({
      next: (response) => {
        this.toastr.success(response.message, 'Success');
        this.cartDetails = response.data;
        this._cartService.cartNumber.next(0);
      },
      error: (error) => {
        this.toastr.error(error.error.message, 'Error');
      },
      complete: () => {
        this._renderer2.setAttribute(clearCartBtn, 'disabled', 'false');
      },
    });
  }

  checkout(): void {
    
  }
}
