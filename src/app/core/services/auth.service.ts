import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private _HttpClient: HttpClient) {}

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
}
