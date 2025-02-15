import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-external-login-callback',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './external-login-callback.component.html',
  styleUrls: ['./external-login-callback.component.scss'],
})
export class ExternalLoginCallbackComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private _authService: AuthService,
    private _router: Router
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      const token = params['token']; // Extract token from URL
      if (token) {
        this._authService.handleExternalLoginResponse(token);
        this._router.navigate(['/Home']); // Redirect after storing token
      } else {
        console.error('External login failed: No token received');
        this._router.navigate(['/login']);
      }
    });
  }
}
