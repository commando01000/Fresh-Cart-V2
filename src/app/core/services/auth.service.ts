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
    window.location.href = `https://localhost:7154/api/Account/ExternalLogin?provider=${provider}&returnUrl=${returnUrl}`;
  }

  SignOut(): void {
    localStorage.removeItem('token');
    this.userToken.next(null);
    this.userData.next(null);
    this.LoggedIn.next(false);
  }

  getUserData(): void {
    let userToken: any = localStorage.getItem('token');
    let decodedToken: any = jwtDecode(userToken);
    if (userToken) {
      this.userToken.next(userToken);
      this.userData.next(decodedToken);
    }
  }
}
