import {
  Component,
  ElementRef,
  HostListener,
  OnInit,
  ViewChild,
  Renderer2,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { BehaviorSubject } from 'rxjs';
import { CartService } from 'src/app/core/services/cart.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  /**
   *
   */
  isLogin = new BehaviorSubject(false);
  cartNumber: number = 0;

  constructor(
    private _authService: AuthService,
    private _cartService: CartService,
    private _router: Router,
    private _renderer2: Renderer2
  ) {}
  ngOnInit(): void {
    // Load authentication state from AuthService
    this._authService.getUserData();
    this.isLogin.next(this._authService.LoggedIn.getValue());
    this._authService.userData.subscribe({
      next: () => {
        if (this._authService.userToken.getValue()) {
          this.isLogin.next(true);
        }
      },
      error: (error) => {
        console.log(error);
        this.isLogin.next(false);
      },
      complete: () => {
        console.log('complete');
      },
    });

    this._cartService.getUserCart().subscribe({
      next: (response) => {
        this._cartService.cartNumber.next(response.numOfCartItems);
      },
      error: (error) => {
        console.log(error);
      },
      complete: () => {},
    });

    this._cartService.cartNumber.subscribe({
      next: (response) => {
        this.cartNumber = response;
      },
      error: (error) => {
        console.log(error);
      },
      complete: () => {
        console.log('complete');
      },
    });
  }

  @ViewChild('navBar') navbar!: ElementRef;
  // scroll Event
  @HostListener('window:scroll') // works for body, document, window
  onWindowScroll(): void {
    this._renderer2.setStyle(
      this.navbar.nativeElement,
      'transition',
      'all 0.3s'
    );
    if (window.scrollY > 100) {
      this._renderer2.addClass(this.navbar.nativeElement, 'px-3');
    } else {
      this._renderer2.removeClass(this.navbar.nativeElement, 'px-3');
    }
  }

  SignOut(): void {
    this._authService.SignOut();
    this._router.navigate(['/login']);
  }
}
