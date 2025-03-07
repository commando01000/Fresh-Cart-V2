import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../core/services/auth.service';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forget-password',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss'],
})
export class ForgetPasswordComponent {
  /**
   *
   */

  email!: string;
  usrMsg!: string;
  isLoading: boolean = false;

  @ViewChild('forgetPassword') forgetPassword!: ElementRef;
  @ViewChild('verifyResetCode') verifyResetCode!: ElementRef;
  @ViewChild('resetPassword') resetPassword!: ElementRef;

  forgetForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
  });

  resetCodeForm: FormGroup = new FormGroup({
    resetCode: new FormControl('', [Validators.required]),
  });

  resetPasswordForm: FormGroup = new FormGroup({
    rePassword: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(30),
      Validators.pattern(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
      ),
    ]),
  });

  constructor(
    private _renderer2: Renderer2,
    private _authService: AuthService,
    private toastr: ToastrService,
    private _router: Router
  ) {}

  SendCode(): void {
    if (this.forgetForm.valid) {
      this.email = this.forgetForm.value.email;
      this.isLoading = true;
      this._authService.SendCode(this.email).subscribe({
        next: (response) => {
          console.log(response);
          this.toastr.success('Code sent successfully', 'Success');

          // after 2 secs hide the forget password form and show the verify reset code form
          setTimeout(() => {
            this._renderer2.addClass(
              this.forgetPassword.nativeElement,
              'd-none'
            );
            this._renderer2.removeClass(
              this.verifyResetCode.nativeElement,
              'd-none'
            );
            this.isLoading = false;
            this.usrMsg = '';
          }, 1300);
        },
        error: (error) => {
          console.log(error);
          this.usrMsg = error.error.message;
          this.isLoading = false;
          this.toastr.error('Something went wrong please try again', 'Error');
        },
        complete: () => {
          this.isLoading = false;
        },
      });
    }
  }

  VerifyCode(): void {
    if (this.resetCodeForm.valid) {
      this.isLoading = true;
      this._authService
        .VerifyCode(this.resetCodeForm.value.resetCode)
        .subscribe({
          next: (response) => {
            console.log(response);
            this.toastr.success('Code verified successfully', 'Success');

            // after 2 secs hide the verify reset code form and show the reset password form
            setTimeout(() => {
              this._renderer2.addClass(
                this.verifyResetCode.nativeElement,
                'd-none'
              );
              this._renderer2.removeClass(
                this.resetPassword.nativeElement,
                'd-none'
              );
              this.isLoading = false;
            }, 1300);
            this.usrMsg = '';
          },
          error: (error) => {
            console.log(error);
            this.usrMsg = error.error.message;
            this.isLoading = false;
            this.toastr.error('Something went wrong please try again', 'Error');
          },
          complete: () => {
            this.isLoading = false;
          },
        });
    }
  }

  ResetPassword(): void {
    if (this.resetPasswordForm.valid) {
      this.isLoading = true;
      this._authService
        .ResetPassword(this.email, this.resetPasswordForm.value.rePassword)
        .subscribe({
          next: (response) => {
            this.toastr.success('Password reset successfully', 'Success');
            this.isLoading = false;
            this._authService.SignOut();
            this._router.navigate(['/Login']);
            this.usrMsg = '';
          },
          error: (error) => {
            this.usrMsg = error.error.message;
            this.isLoading = false;
            this.toastr.error('Something went wrong please try again', 'Error');
          },
          complete: () => {
            this.isLoading = false;
          },
        });
    }
  }
}
