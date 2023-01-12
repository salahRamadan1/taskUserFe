import { Component, OnInit } from '@angular/core';
import { HomeService } from 'src/app/service/home.service';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor(private _HomeService: HomeService) {}
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: [' ', ' '],
    responsive: {
      0: {
        items: 1,
      },
      400: {
        items: 2,
      },
      740: {
        items: 3,
      },
      940: {
        items: 4,
      },
    },
    nav: true,
  };
  ngOnInit(): void {
    this.get();
    this.showLogin();
  }
  // to get product
  data: any[] = [];
  get() {
    this._HomeService.getData().subscribe((res) => {
      if (res.message == 'success') {
        this.data = res.isProd;
      }
    });
  }

  // to buy

  success: string = '';
  buyProduct(_id: string) {
    // show if user id login or no
    if (localStorage.getItem('userToken') == null) {
      (<HTMLDivElement>document.getElementById('buyOrNot')).style.display =
        'flex';
    }
    // save order
    else {
      let data = { productOrder: _id };
      this._HomeService.addOrder(data).subscribe((res) => {
        if (res.message == 'success') {
          this.success = res.message;
          window.onclick = (all: any) => {
            (<HTMLDivElement>document.getElementById('success')).style.top =
              all.clientY;
            (<HTMLDivElement>document.getElementById('success')).style.left =
              all.clientX;
          };
          setTimeout(() => {
            this.success = '';
            (<HTMLDivElement>document.getElementById('success')).style.display =
              'none';
          }, 1000);
        }
      });
    }
  }
  // close to buy
  closeBuy() {
    (<HTMLDivElement>document.getElementById('buyOrNot')).style.display =
      'none';
  }
  // show login after 2 second after window load
  showLogin() {
    if (localStorage.getItem('userToken') == null) {
      window.onload = () => {
        setTimeout(() => {
          (<HTMLDivElement>document.getElementById('buyOrNot')).style.display =
            'flex';
        }, 5000);
      };
    }
  }
  // add order
}
