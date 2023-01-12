import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  constructor(private _AuthService: AuthService) {}
  isLogged: boolean = false;
  ngOnInit(): void {
    this._AuthService.user.subscribe(() => {
      if (this._AuthService.user.getValue() == null) {
        this.isLogged = false;
      }else{
        this.isLogged = true
      }
    });
  }

  
}
