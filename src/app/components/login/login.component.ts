import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  formLogin: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.email, Validators.required]),
    password: new FormControl(null, [
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(15),
    ]),
  });
  constructor(private _AuthService: AuthService , private _Router:Router) {}

  ngOnInit(): void {}
  err: string = '';
  confirm: string = '';
  login() {
    console.log(this.formLogin.value);
    this._AuthService.loginForm(this.formLogin.value).subscribe((res) => {
      console.log(res);
      if (res.message == 'success') {
         localStorage.setItem('userToken' ,res.token)
        this._Router.navigate(['/'])
        this._AuthService.setToken()
      }
      if (res.msg == ' chick your email to confirm your email ') {
        this.confirm = ' chick your email to confirm your email ';
      } else {
        this.err = res.message;
        setTimeout(() => {
          this.err = '';
        }, 2000);
      }
    });
  }
}
