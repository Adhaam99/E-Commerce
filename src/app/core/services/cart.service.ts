import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { baseUrl } from '../../environment/environment.local';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor(private _HttpClient: HttpClient) {}

  myHeaders: any = { token: localStorage.getItem('userToken') };

  addToCart = (productId: string): Observable<any> => {
    return this._HttpClient.post(
      `${baseUrl}api/v1/cart`,
      { productId },
      { headers: this.myHeaders }
    );
  };

  getUserCart = (): Observable<any> => {
    return this._HttpClient.get(`${baseUrl}api/v1/cart`, {
      headers: this.myHeaders,
    });
  };

  removeCartItem = (id: string): Observable<any> => {
    return this._HttpClient.delete(`${baseUrl}api/v1/cart/${id}`, {
      headers: this.myHeaders,
    });
  };

  updateCartProductQTY = (id:string, count: number): Observable<any> => {
    return this._HttpClient.put(`${baseUrl}api/v1/cart/${id}`, { count } , { headers:this.myHeaders });
  };

  clearCart = (): Observable<any> => {
    return this._HttpClient.delete(`${baseUrl}api/v1/cart`, {
      headers: this.myHeaders,
    });
  };

}
