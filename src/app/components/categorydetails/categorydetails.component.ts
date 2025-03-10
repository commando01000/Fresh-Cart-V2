import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from 'src/app/core/services/product.service';
import { ActivatedRoute } from '@angular/router';
import { Category } from 'src/app/core/interfaces/category';

@Component({
  selector: 'app-categorydetails',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './categorydetails.component.html',
  styleUrls: ['./categorydetails.component.scss'],
})
export class CategorydetailsComponent implements OnInit {
  constructor(
    private _productService: ProductService,
    private _ActivatedRoute: ActivatedRoute
  ) {}
  category: Category = {} as Category;
  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe({
      next: (params) => {
        this._productService
          .getCategoryDetails(params.get('id') || '')
          .subscribe({
            next: (response: any) => {
              this.category = response.data;
            },
            error: (error) => {
              console.log(error);
            },
            complete: () => {
              console.log('complete');
            },
          });
      },
    });
  }
}
