import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  /**
   *
   */
  isLogin = new BehaviorSubject(false);
  constructor(private _authService: AuthService, private _router: Router) {
    _authService.userData.subscribe({
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
  }

  SignOut(): void {
    this._authService.SignOut();
    this._router.navigate(['/login']);
  }
}
