import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  FormControlOptions,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  /**
   *
   */
  constructor(private _AuthService: AuthService, private _router: Router) {}

  errorMessage: string = '';
  isLoading: boolean = false;

  registerForm: FormGroup = new FormGroup(
    {
      name: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(30),
      ]),
      email: new FormControl('', [Validators.email, Validators.required]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(30),
        Validators.pattern(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
        ),
      ]),
      rePassword: new FormControl(''),
      phone: new FormControl('', [Validators.pattern(/^01[0125][0-9]{8}$/)]),
    },
    {
      validators: this.confirmPassword,
    } as FormControlOptions
  );

  confirmPassword(regForm: FormGroup): void {
    if (regForm.get('rePassword')?.value === '') {
      regForm.get('rePassword')?.setErrors({ required: true });
    } else if (
      regForm.get('password')?.value !== regForm.get('rePassword')?.value
    ) {
      regForm.get('rePassword')?.setErrors({ misMatch: true });
    }
  }

  onSubmit(): void {
    const userData = this.registerForm.value;
    if (this.registerForm.valid) {
      this.isLoading = true;
      this._AuthService.Register(userData).subscribe({
        next: (response) => {
          // console.log(response);
          if (response.message === 'success') {
            this.registerForm.reset();
            this._router.navigate(['/auth/login']);
          }
        },
        error: (error) => {
          console.log(error);
          this.errorMessage = error.error.message;
          this.isLoading = false;
        },
        complete: () => {
          this.isLoading = false;
        },
      });
    }
  }
}
