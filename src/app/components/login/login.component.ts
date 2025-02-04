import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  /**
   *
   */
  constructor(private _AuthService: AuthService, private _router: Router) {}

  errorMessage: string = '';
  isLoading: boolean = false;

  loginForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.email, Validators.required]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(30),
      Validators.pattern(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
      ),
    ]),
  });

  loginWithGoogle() {
    const provider = 'Google';
    const returnUrl = '/Home'; // The page to redirect to after login
    this._AuthService.ExternalLogin(provider, returnUrl);
    this._AuthService.LoggedIn.next(true);
  }

  onSubmit(): void {
    const userData = this.loginForm.value;
    if (this.loginForm.valid) {
      this.isLoading = true;
      this._AuthService.Login(userData).subscribe({
        next: (response) => {
          console.log(response);
          if (response.message === 'success') {
            this.loginForm.reset();
            this.isLoading = false;
            this._AuthService.LoggedIn.next(true);
            localStorage.setItem('token', response.token);
            this._AuthService.getUserData();
            this._router.navigate(['/Home']);
          }
        },
        error: (error) => {
          console.log(error);
          this.errorMessage = error.error.message;
          this._AuthService.LoggedIn.next(false);
          this.isLoading = false;
        },
        complete: () => {
          this.isLoading = false;
        },
      });
    }
  }
}
