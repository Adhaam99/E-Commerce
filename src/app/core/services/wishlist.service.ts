import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { baseUrl } from '../../environment/environment.local';

@Injectable({
  providedIn: 'root',
})
export class WishlistService {
  myHeadres: any = { token: localStorage.getItem('userToken') };

  constructor(private _HttpClient: HttpClient) {}

  addToWishlist = (productId: string): Observable<any> => {
    return this._HttpClient.post(
      `${baseUrl}api/v1/wishlist`,
      { productId },
      { headers: this.myHeadres }
    );
  };

  removeFromWishlist = (productId: string): Observable<any> => {
    return this._HttpClient.delete(
      `${baseUrl}api/v1/wishlist/${productId}`,
      { headers: this.myHeadres }
    );
  };

  getWishlist = (): Observable<any> => {
    return this._HttpClient.get(
      `${baseUrl}api/v1/wishlist`,
      { headers: this.myHeadres }
    );
  };

}
