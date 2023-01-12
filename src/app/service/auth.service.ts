import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import jwtDecode from 'jwt-decode';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user = new BehaviorSubject(null);
  baseUrl: string = 'http://localhost:3000/users/';
  constructor(private _HttpClient: HttpClient, private _Router: Router) {
    if (localStorage.getItem('userToken') != null) {
      this.setToken();
    } else {
      this.remove();
    }
  }

  setToken() {
    let token = localStorage.getItem('userToken');
    let decode: any = jwtDecode(<string>token);
    this.user.next(decode);
    console.log(this.user);
  }
  remove() {
    localStorage.removeItem('userToken');
    this._Router.navigate(['/']);
    this.user.next(null);
  }
  registerForm(obj: any): Observable<any> {
    return this._HttpClient.post(this.baseUrl + 'signUp', obj);
  }

  loginForm(obj: any): Observable<any> {
    return this._HttpClient.post(this.baseUrl + 'signIn', obj);
  }
}
