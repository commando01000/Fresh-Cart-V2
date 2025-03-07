import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { BehaviorSubject, Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private _HttpClient: HttpClient) {}

  userToken = new BehaviorSubject(null);
  userData = new BehaviorSubject(null);
  LoggedIn = new BehaviorSubject(false);

  Register(userData: object): Observable<any> {
    return this._HttpClient.post(
      'https://ecommerce.routemisr.com/api/v1/auth/signup',
      userData
    );
  }

  Login(userDate: object): Observable<any> {
    return this._HttpClient.post(
      'https://ecommerce.routemisr.com/api/v1/auth/signin',
      userDate
    );
  }

  ExternalLogin(provider: string, returnUrl: string): void {
    window.open(
      `https://localhost:7154/api/Account/ExternalLogin?provider=${provider}&returnUrl=${returnUrl}`,
      '_self'
    );
  }

  // NEW FUNCTION: Handle External Login Response
  handleExternalLoginResponse(token: any): void {
    if (token) {
      localStorage.setItem('token', token);
      this.userToken.next(token);
      this.getUserData();
      this.LoggedIn.next(true);
    }
  }

  SignOut(): void {
    localStorage.removeItem('token');
    this.userToken.next(null);
    this.userData.next(null);
    this.LoggedIn.next(false);
  }

  getUserData(): void {
    let userToken: any = localStorage.getItem('token');
    this.LoggedIn.next(true);
    let decodedToken: any = jwtDecode(userToken);
    if (userToken) {
      this.userToken.next(userToken);
      this.userData.next(decodedToken);
    }
  }

  SendCode(email: string): Observable<any> {
    return this._HttpClient.post(
      'https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords',
      {
        email: email,
      }
    );
  }

  VerifyCode(resetCode: string): Observable<any> {
    return this._HttpClient.post(
      'https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode',
      {
        resetCode: resetCode,
      }
    );
  }

  ResetPassword(email: string, rePassword: string): Observable<any> {
    let formObj: any = {
      email: email,
      newPassword: rePassword,
    };
    return this._HttpClient.post(
      'https://ecommerce.routemisr.com/api/v1/auth/resetPassword',
      {
        formObj,
      }
    );
  }
}
