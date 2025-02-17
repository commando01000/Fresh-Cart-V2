import { Component, OnInit } from '@angular/core';
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
    private toastr: ToastrService
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
}
