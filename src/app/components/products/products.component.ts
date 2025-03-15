import { Component, OnInit, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from 'src/app/core/services/product.service';
import { Product } from 'src/app/core/interfaces/product';
import { RouterLink } from '@angular/router';
import { CutTextPipe } from 'src/app/core/pipes/cut-text.pipe';
import { ToastrService } from 'ngx-toastr';
import { CartService } from 'src/app/core/services/cart.service';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, RouterLink, CutTextPipe, NgxPaginationModule],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  /**
   *
   */
  constructor(
    private _productService: ProductService,
    private _cartService: CartService,
    private toastr: ToastrService,
    private _renderer2: Renderer2
  ) {}

  Products: Product[] = [];
  pageSize: number = 9;
  pageNumber: number = 1;
  totalProducts: number = 0;
  ngOnInit(): void {
    this._productService.getProducts().subscribe({
      next: (response: any) => {
        this.Products = response.data;
        this.pageSize = response.metadata.limit;
        this.pageNumber = response.metadata.currentPage;
        this.totalProducts = response.results;
      },
      error: (error) => {
        console.log(error);
      },
      complete: () => {},
    });
  }
  pageChanged(event: any): void {
    debugger;
    this._productService.getProducts(event).subscribe({
      next: (response: any) => {
        this.Products = response.data;
        this.pageSize = response.metadata.limit;
        this.pageNumber = response.metadata.currentPage;
        this.totalProducts = response.results;
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
}
