import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/core/services/product.service';
import { Product } from 'src/app/core/interfaces/product';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CommonModule, CarouselModule],
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
})
export class ProductDetailsComponent implements OnInit {
  /**
   *
   */
  productId: string = '';
  product: Partial<Product> = {};

  productDetailsOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: true,
    navSpeed: 700,
    navText: ['', ''],
    items: 1,
    nav: false,
  };
  constructor(
    private _activatedRoute: ActivatedRoute,
    private _productService: ProductService
  ) {}

  get isProductLoaded(): boolean {
    return Object.keys(this.product).length > 0;
  }

  ngOnInit(): void {
    this._activatedRoute.paramMap.subscribe({
      next: (params) => {
        this.productId = params.get('id') || '';
        this._productService.getProductDetails(this.productId).subscribe({
          next: (response: any) => {
            console.log(response);
            this.product = response.data;
          },
          error: (error) => {
            console.log(error);
          },
          complete: () => {
            console.log('complete');
          },
        });
      },
      error: (error) => {
        console.log(error);
      },
      complete: () => {
        console.log('complete');
      },
    });
  }
}
