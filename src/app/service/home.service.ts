import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  constructor(private _HttpClient: HttpClient) {}
  token: any = localStorage.getItem('userToken');
  getData(): Observable<any> {
    return this._HttpClient.get('http://localhost:3000/Products');
  }
  // add order to cart
  addOrder(obj: any): Observable<any> {
    return this._HttpClient.post('http://localhost:3000/orders', obj, {
      headers: { token: this.token },
    });
  }
  // get order
  getOrder(): Observable<any> {
    return this._HttpClient.get('http://localhost:3000/orders', {
      headers: { token: this.token },
    });
  }
  // update order count
  updateCount(obj: any): Observable<any> {
    return this._HttpClient.patch(
      'http://localhost:3000/orders/updateOrderCount',
      obj,
      { headers: { token: this.token } }
    );
  }
  // updateOrderToBuy
  updateOrderToBuy(obj: any): Observable<any> {
    return this._HttpClient.patch(
      'http://localhost:3000/orders/updateOrderToBuy',
      obj,
      { headers: { token: this.token } }
    );
  }
  // get order still un arrive
  getOrderStillUnArrive(): Observable<any> {
    return this._HttpClient.get('http://localhost:3000/orders/getOrderPru', {
      headers: { token: this.token },
    });
  }
  // done arrive order
  doneOrderArrive(obj: any): Observable<any> {
    return this._HttpClient.patch('http://localhost:3000/orders/', obj, {
      headers: { token: this.token },
    });
  }
}
