import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { baseUrl } from '../../environment/environment.local';
import { Observable } from 'rxjs';
import { jwtDecode } from 'jwt-decode';
import { Token } from '../interfaces/token';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  
  userData !: Token;

  private readonly _HttpClient = inject(HttpClient);

  signUp(data: object): Observable<any> {
    return this._HttpClient.post(baseUrl + 'api/v1/auth/signup', data);
  }

  signIn(data: object): Observable<any> {
    return this._HttpClient.post(baseUrl + 'api/v1/auth/signin', data);
  }

  saveUserData(): void {
    if (localStorage.getItem('userToken') !== null) {

      this.userData=jwtDecode( localStorage.getItem('userToken')! )
    }
  }
}
