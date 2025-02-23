import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from 'src/app/core/services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss'],
})
export class PaymentComponent implements OnInit {
  /**
   *
   */
  constructor(
    private _cartService: CartService,
    private toastr: ToastrService,
    private _route: ActivatedRoute
  ) {}

  cartId: string = '';

  orderForm: FormGroup = new FormGroup({
    details: new FormControl(''),
    phone: new FormControl(''),
    city: new FormControl(''),
  });

  ngOnInit(): void {
    this._route.paramMap.subscribe({
      next: (params) => {
        this.cartId = params.get('id') || '';
      },
      error: (error) => {
        console.log(error);
        this.toastr.error(error.error.message, 'Error');
      },
      complete: () => {
        console.log('complete');
      },
    });
  }
  onSubmit(): void {
    this._cartService.checkout(this.cartId, this.orderForm.value).subscribe({
      next: (response) => {
        window.open(response.session?.url);
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
