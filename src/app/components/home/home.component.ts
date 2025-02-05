import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/core/services/product.service';
import { Product } from 'src/app/core/interfaces/product';
import { CutTextPipe } from 'src/app/core/pipes/cut-text.pipe';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, CutTextPipe],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  /**
   *
   */
  constructor(
    private _router: Router,
    private _productService: ProductService
  ) {}

  Products: Product[] = [];
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
  }
}
