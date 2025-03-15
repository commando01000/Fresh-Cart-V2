import { Component, OnInit, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WishlistService } from 'src/app/core/services/wishlist.service';
import { Product } from 'src/app/core/interfaces/product';
import { CartService } from 'src/app/core/services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { RouterLink } from '@angular/router';
import { CutTextPipe } from 'src/app/core/pipes/cut-text.pipe';

@Component({
  selector: 'app-wishlist',
  standalone: true,
  imports: [CommonModule, RouterLink, CutTextPipe],
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.scss'],
})
export class WishlistComponent implements OnInit {
  /**
   *
   */

  Products: Product[] = [];
  constructor(
    private _wishlistService: WishlistService,
    private _cartService: CartService,
    private toastr: ToastrService,
    private _renderer2: Renderer2
  ) {}
  ngOnInit(): void {
    // get all wishlist items
    this._wishlistService.getWishlistItems().subscribe({
      next: (response) => {
        console.log(response);
        this.Products = response.data;
      },
      error: (error) => {
        console.log(error);
      },
      complete: () => {},
    });
  }

  addToCart(productId: string, btn: HTMLButtonElement): void {
    // disable button to prevent multiple clicks
    this._renderer2.setAttribute(btn, 'disabled', 'true');
    this._cartService.addToCart(productId).subscribe({
      next: (response) => {
        console.log(response);
        this.toastr.success(response.message, 'Success');
        this._renderer2.removeAttribute(btn, 'disabled');
        this._cartService.cartNumber.next(response.numOfCartItems);
      },
      error: (error) => {
        this.toastr.error(error.error.message, 'Error');
        this._renderer2.removeAttribute(btn, 'disabled');
      },
      complete: () => {},
    });
  }

  addToWishlist(productId: string, btn: HTMLElement): void {
    // disable button to prevent multiple clicks
    this._wishlistService.addToWishlist(productId).subscribe({
      next: (response) => {
        this.toastr.success(response.message, 'Success');
        this._renderer2.setAttribute(btn, 'disabled', 'true');
      },
      error: (error) => {
        this.toastr.error(error.error.message, 'Error');
        this._renderer2.removeAttribute(btn, 'disabled');
      },
      complete: () => {},
    });
  }
  removeFromWishlist(productId: string, btn: HTMLElement): void {
    // disable button to prevent multiple clicks
    this._wishlistService.addToWishlist(productId).subscribe({
      next: (response) => {
        this.toastr.success(response.message, 'Success');
        this._renderer2.setAttribute(btn, 'disabled', 'true');
      },
      error: (error) => {
        this.toastr.error(error.error.message, 'Error');
        this._renderer2.removeAttribute(btn, 'disabled');
      },
      complete: () => {},
    });
  }
}
