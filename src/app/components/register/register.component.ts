import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  constructor(private _AuthService: AuthService, private _Router: Router) {}
  formRegister: FormGroup = new FormGroup({
    firstName: new FormControl(null, [
      Validators.minLength(3),
      Validators.maxLength(16),
      Validators.required,
    ]),
    lastName: new FormControl(null, [
      Validators.minLength(3),
      Validators.maxLength(16),
      Validators.required,
    ]),
    email: new FormControl(null, [Validators.email, Validators.required]),
    password: new FormControl(null, [
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(15),
    ]),
    Phone: new FormControl(null, [
      Validators.required,

      Validators.maxLength(11),
    ]),
    addresses: new FormControl(null, [Validators.required]),
  });
  ngOnInit(): void {}
  err: string = '';
  success:string =''
  register() {
    // console.log(this.formRegister.value);
    this._AuthService.registerForm(this.formRegister.value).subscribe((res) => {
      console.log(res);
      if (res.message == 'success') {
        this.success = res.message
        setTimeout(() => {
          this._Router.navigate(['/login']);
        }, 2000);
      } else {
        this.err = res.msg;
      }
    });
  }
}
