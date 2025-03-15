import { Component, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { ProductService } from 'src/app/core/services/product.service';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { CutTextPipe } from 'src/app/core/pipes/cut-text.pipe';
import { Product } from 'src/app/core/interfaces/product';
import { Category } from 'src/app/core/interfaces/category';
import { CartService } from 'src/app/core/services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';
import { SearchPipe } from 'src/app/core/pipes/search.pipe';
import { WishlistService } from 'src/app/core/services/wishlist.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    CutTextPipe,
    CarouselModule,
    SearchPipe,
    FormsModule,
    RouterLink,
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  /**
   *
   */
  constructor(
    private _router: Router,
    private _productService: ProductService,
    private _cartService: CartService,
    private toastr: ToastrService,
    private _renderer2: Renderer2,
    private _wishlistService: WishlistService
  ) {}

  Products: Product[] = [];
  Categories: Category[] = [];
  searchTerm: string = '';
  wishListItems: string[] = [];

  categoryOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    navSpeed: 700,
    autoplay: true,
    navText: ['previous', 'next'],
    responsive: {
      0: {
        items: 1,
      },
      400: {
        items: 3,
      },
      740: {
        items: 4,
      },
      940: {
        items: 6,
      },
    },
    nav: true,
  };

  mainSlideOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: true,
    navSpeed: 700,
    autoplay: true,
    autoplayTimeout: 3000,
    autoplaySpeed: 1000,
    navText: ['previous', 'next'],
    items: 1,
    nav: false,
  };

  ngOnInit(): void {
    this._productService.getProducts().subscribe({
      next: (response: any) => {
        this.Products = response.data;
      },
      error: (error) => {
        console.log(error);
      },
      complete: () => {
        console.log('complete');
      },
    });

    this._productService.getCategories().subscribe({
      next: (response: any) => {
        this.Categories = response.data;
      },
      error: (error) => {
        console.log(error);
      },
      complete: () => {
        console.log('complete');
      },
    });

    this._wishlistService.getWishlistItems().subscribe({
      next: (response) => {
        console.log(response);
        this._wishlistService.wishlistNumber.next(response.count);
        this.wishListItems = response.data.map((item: any) => item._id);
      },
      error: (error) => {
        console.log(error);
      },
      complete: () => {
        console.log('complete');
      },
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
        console.log(response);
        this.toastr.success(response.message, 'Success');
        this._renderer2.setAttribute(btn, 'disabled', 'true');
        this.wishListItems = response.data;
        this._wishlistService.wishlistNumber.next(this.wishListItems.length);
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
    this._wishlistService.removeFromWishlist(productId).subscribe({
      next: (response) => {
        console.log(response);
        this.toastr.success(response.message, 'Success');
        this._renderer2.setAttribute(btn, 'disabled', 'true');
        this.wishListItems = response.data;
        this._wishlistService.wishlistNumber.next(this.wishListItems.length);
      },
      error: (error) => {
        this.toastr.error(error.error.message, 'Error');
        this._renderer2.removeAttribute(btn, 'disabled');
      },
      complete: () => {},
    });
  }
}
