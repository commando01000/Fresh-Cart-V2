import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  FormControlOptions,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
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
    console.log(this.registerForm.value);
  }
}
