import { Component, OnInit } from '@angular/core';
import { ShopService } from 'src/app/services/shop.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})

export class OrdersComponent implements OnInit {

  orderCompleted: boolean = false;
  date: any;
  isCreditCardValid: boolean = false;
  creditCard: number;
  street: string = "";
  city: string = "";
  user: any;
  totalPrice: number = 0;
  searchText: string;
  userProducts: any;
  errorMsg: any;
  currentDate: Date = new Date();
  cartId: string;

  constructor(private shopService: ShopService, private router: Router) { }

  BackToShop() {
    return this.router.navigate(['/shop']);

  }
  autoFiller(ev) {
    if (ev.target.name === "city") {
      this.city = this.user.city;
    }
    else if (ev.target.name === "street") {
      this.street = this.user.street;
    }
  }

  creditCardValidation() {
    this.errorMsg = null;
    let isMasterCard = /^(?:5[1-5][0-9]{2}|222[1-9]|22[3-9][0-9]|2[3-6][0-9]{2}|27[01][0-9]|2720)[0-9]{12}$/;
    let isVisa = /^4[0-9]{12}(?:[0-9]{3})?$/;
    let isAmericanExpress = /^3[47][0-9]{13}$/;
    let isDinersOrDiscover = /^6(?:011|5[0-9]{2})[0-9]{12}$/;
    let isIsraCard = /(3640|4580)-?([0-9]{4}-?){3}/;
    let isJcb = /^(?:2131|1800|35\d{3})\d{11}$/;
    let isUnionPay = /^(62[0-9]{14,17})$/;

    if (isMasterCard.test(this.creditCard.toString())) {
      this.isCreditCardValid = true;
    }
    else if (isVisa.test(this.creditCard.toString())) {
      this.isCreditCardValid = true;
    }
    else if (isAmericanExpress.test(this.creditCard.toString())) {
      this.isCreditCardValid = true;
    }
    else if (isDinersOrDiscover.test(this.creditCard.toString())) {
      this.isCreditCardValid = true;
    }
    else if (isIsraCard.test(this.creditCard.toString())) {
      this.isCreditCardValid = true;
    }
    else if (isJcb.test(this.creditCard.toString())) {
      this.isCreditCardValid = true;
    }
    else if (isUnionPay.test(this.creditCard.toString())) {
      this.isCreditCardValid = true;
    }
    else {
      this.isCreditCardValid = false;
    }
  }
  completeOrder() {
    var newDate = new Date(this.date + "Z")
    if (this.isCreditCardValid && this.city.length > 2 && this.street.length > 1 && this.date && newDate > this.currentDate) {
      this.order();
    }
    else if (!this.isCreditCardValid) {
      this.errorMsg = "Invalid cerdit card";
    }
    else if (this.city.length <= 2) {
      this.errorMsg = "Invalid city";
    }
    else if (this.street.length <= 1) {
      this.errorMsg = "Invalid street";
    }
    else if (!this.date) {
      this.errorMsg = 'Invalid date';
    }
    else if (newDate <= this.currentDate) {
      this.errorMsg = "Date must be in the future or today";
    }
  }
  order() {

    this.shopService.order({
      customerId: this.user._id,
      cartId: this.shopService.cartId,
      finalPrice: this.totalPrice,
      scheduled: this.date,
      city: this.city,
      street: this.street,
      generated: this.currentDate,
      card: this.creditCard.toString().substr(-4)
    }).subscribe(data => {
      if (data) {
        this.shopService.lockCartProd({
          cartId: this.shopService.cartId,
          generated: this.currentDate
        }).subscribe(() => {
          this.shopService.lockCart({ generated: this.currentDate }).subscribe(() => {
            this.orderCompleted = true;
          })
        })
      }
    })
  }
  dowenloading(){
    this.shopService.dowanloadProducts().subscribe(()=>{

    });

  }

  ngOnInit() {
    if (!this.shopService.userProducts || !this.shopService.user) {
      return this.router.navigate(['/']);
    }
    this.userProducts = this.shopService.userProducts;
    this.userProducts.forEach(prod => this.totalPrice += prod.totalPrice)
    this.user = this.shopService.user;
    this.cartId = this.shopService.cartId;
  }
}
