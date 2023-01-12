import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';
import { HomeService } from 'src/app/service/home.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

HomeService;
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  constructor(private _HomeService: HomeService , private _AuthService:AuthService ) {}

  ngOnInit(): void {
    this.get();
    this.stillUnArrive();
  }
  data: any = [];
  err: string = '';
  show: Boolean = false;
  get() {
    this._HomeService.getOrder().subscribe((res) => {
  
      
      if (res.message == 'success') {
        this.data = res.Order;
      
      } else {
        this.err = res.message;
      }
    });
  }
  //  update count
  updateCountUser(_id: string) {
    let count = Number(
      (<HTMLInputElement>document.getElementById('count')).value
    );
    let data = { productOrder: _id, count };

    this._HomeService.updateCount(data).subscribe((res) => {
      if (res.message == 'success') {
        this.get();
      }
    });
  }
  // Purchase confirmation
  Purchase(id: string) {
 
    let data = { productOrder: id };
    this._HomeService.updateOrderToBuy(data).subscribe((res) => {
      if (res.message == 'success') {
        this.get();
        this.data = []
        this.stillUnArrive();
      }
    });
  }
  // stillUnArrive
  successOrder: string = '';
  dataOrderDone: any[] = [];
  stillUnArrive() {
    this._HomeService.getOrderStillUnArrive().subscribe((res) => {
    console.log(res);
    
      if (res.message == 'success') {
        this.dataOrderDone.push(res.Order);
        this.get()
      } else {
        this.successOrder = res.message;
      }
    });
  }
  // done arrive order
  doneOrderArriveForUser(_id: string) {
    let data = { _id };
    this._HomeService.doneOrderArrive(data).subscribe((res) => {
      console.log(res);
      if (res.message == 'success') {
        this.get()
        this.stillUnArrive();
        this.dataOrderDone = [];
      }
    });
  }
  // logOut
  logOut(){
    this._AuthService.remove()
  }
}
