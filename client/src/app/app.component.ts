import { Component } from '@angular/core';
import {ShopService} from './services/shop.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {

  constructor (private shopService:ShopService){}
  logout(){
    this.shopService.logout().subscribe();
    window.location.reload();
  }


}
