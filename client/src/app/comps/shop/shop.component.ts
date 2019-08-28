import { Component, OnInit } from '@angular/core';
import { ShopService } from 'src/app/services/shop.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {
  
  
  constructor(private shopService: ShopService, private router: Router) { }
  
  title: string;
  categoryType: string;
  url: string;
  price: number;
  prodType: string;
  currentlyEditing: boolean =false;
  sideBarConceled: boolean = false;
  totalPrice: number = 0;
  userProducts: any;
  cartId: string;
  user: any;
  amountOfInspected: number = 0;
  inspectedProduct: any;
  currentlyAdding: boolean = false;
  searchProduct: string;
  allCategories: any;
  allProducts: any;


  showCategory(ev) {
    this.shopService.getProducts().subscribe(productsData => {
      this.allProducts = productsData.filter(prod => prod.categoryType === ev);
    });
  }
  searchProd() {

    this.shopService.getProducts().subscribe(product => {
      this.allProducts = product.filter(prod => prod.title.toLowerCase().includes(this.searchProduct.toLowerCase()))
    })
  }

  addProduct(prodId) {
    this.currentlyAdding = true;
    this.inspectedProduct = this.allProducts.filter(prod => prod._id === prodId)[0]
  }
  editProduct(prodId,prodPrice) {
    this.currentlyEditing = true;
    this.inspectedProduct = this.allProducts.filter(prod => prod._id === prodId)[0]
    this.inspectedProduct['price']=prodPrice;
  }
  inspectProdAsAdmin(){
    this.userProducts.push(this.inspectedProduct)
  }

  insertToCart() {
    if (this.amountOfInspected === 0) {
      return alert('Amount must be bigger than 0');
    }
    else if (this.userProducts.filter(prod => prod.ProdId === this.inspectedProduct._id).length > 0) {
      return alert(`You already have ${this.inspectedProduct.title}, to insert more of this product you must first delete it from your cart`)
    }
    this.currentlyAdding = false;
    this.shopService.createCart(this.user).subscribe(data => {
      if (typeof data === 'object') {
        this.shopService.insertToCart({
          ProdId: this.inspectedProduct._id,
          cartId: data._id,
          amount: this.amountOfInspected,
          totalPrice: this.amountOfInspected * this.inspectedProduct.price,
        }).subscribe(data => {
          let myProduct = data;
          myProduct['title'] = this.inspectedProduct.title;
          myProduct['url'] = this.inspectedProduct.url;
          this.totalPrice = myProduct.totalPrice + this.totalPrice;
          this.userProducts.push(myProduct);
          this.cartId = myProduct.cartId;
        });
      }
      else {
        this.shopService.insertToCart({
          ProdId: this.inspectedProduct._id,
          cartId: data,
          amount: this.amountOfInspected,
          totalPrice: this.amountOfInspected * this.inspectedProduct.price,
        }).subscribe(data => {
          let myProduct = data;
          myProduct['title'] = this.inspectedProduct.title;
          myProduct['url'] = this.inspectedProduct.url;
          this.totalPrice = myProduct.totalPrice + this.totalPrice;
          this.userProducts.push(myProduct);
        });
      }
    })

  }
  searchCart() {
    this.shopService.searchCart(this.user._id).subscribe(data => {
      if (data) {

        this.cartId = data._id;
        this.shopService.searchProducts(this.cartId).subscribe(data2 => {
          this.userProducts = data2;
          this.showProducts(this.userProducts.map(prod => prod.ProdId), this.userProducts);
        })
      }
      else {
        this.userProducts = [];
      }
    })
  }
  showProducts(ev, userProducts) {
    this.shopService.sendProducts(ev).subscribe(data => {
      for (let i: number = 0; i < userProducts.length; i++) {
        userProducts[i]["title"] = data[i].title;
        userProducts[i]["url"] = data[i].url;
        this.totalPrice += userProducts[i]["totalPrice"];
      }
      this.userProducts = userProducts;
    })
  }
  saveEdit(){
    this.shopService.adminEditProduct({
      prodId:this.inspectedProduct._id,
      title:this.title,
      categoryType:this.categoryType,
      url:this.url,
      price:this.price
    }).subscribe()
   }

  addAndSubtract(ev) {
    let method: string = ev.target.innerHTML;
    if (method === '-' && this.amountOfInspected > 0) {
      this.amountOfInspected--;
    }
    if (method === '+') {
      this.amountOfInspected++;

    }
  }

  toggleSideBar(sideBar, view) {
    if (!this.sideBarConceled) {
      this.sideBarConceled = true;
      sideBar.style.flexBasis = '0%';
      view.style.flexBasis = '100%';
      sideBar.style.width = 0;
    }
    else {
      this.sideBarConceled = false;
      sideBar.style.flexBasis = '25%';
      view.style.flexBasis = '75%';
    }
  }

  deleteProduct(id, cartId, totalPrice) {

    this.shopService.deleteProd({
      product: id,
      cart: cartId
    }).subscribe((data) => {
      if (data.ok) {
        this.userProducts = this.userProducts.filter(prod => prod._id !== id);
        this.totalPrice = this.totalPrice - totalPrice;
      }
    });
  }
  deleteAll() {
    this.shopService.deleteAllProd(this.cartId).subscribe();
    this.userProducts = [];
    this.cartId = null;
    this.totalPrice = 0;
  }

  naviagteToOrders() {
    this.shopService.assignUserProducts(this.userProducts);
    this.shopService.assignCartId(this.cartId);
    this.router.navigate(['/orders']);

  }

  ngOnInit() {
    this.shopService.getCategories().subscribe(categoryData => {
      this.allCategories = categoryData;
      this.showCategory(this.allCategories[0]._id);
      if (this.shopService.user) {
        this.user = this.shopService.user;
        this.searchCart();
      }
      else {
        this.router.navigate(["/"]);
      }
    });
  }

}


