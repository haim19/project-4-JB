import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs'

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class ShopService {

  user: any;
  userProducts: any;
  cartId: string;

  constructor(private http: HttpClient) { }

  assignUser(user) {

    this.user = user;
  }
  assignCartId(id) {

    this.cartId = id;
  }

  assignUserProducts(userProducts) {

    this.userProducts = userProducts;
  }

  login(ev): Observable<any> {

    return this.http.post("/login", {
      email: ev.email.value,
      password: ev.password.value
    }, httpOptions)
  }
  sendProducts(ev): Observable<any> {

    return this.http.post('/get_cart_product', {
      prodList: ev
    }, httpOptions);
  }

  checkId(details): Observable<any> {

    return this.http.post("/checkid", {
      clientId: details.id,
      email: details.email
    }, httpOptions)
  }

  checkSession(): Observable<any> {

    return this.http.get('/prelog');
  }

  getProducts(): Observable<any> {
    return this.http.get('/products');
  }
  getCategories(): Observable<any> {
    return this.http.get('/categories');
  }
  createCart(ev: string): Observable<any> {
    return this.http.post('/cart', {
      customer: ev
    }, httpOptions)
  }

  deleteProd(ev): Observable<any> {

    return this.http.delete(`/product/${ev.product}`, {
      params: {
        cartId: ev.cart
      }
    })
  }

  deleteAllProd(cartId): Observable<any> {

    return this.http.delete(`/products/${cartId}`)
  }

  insertToCart(ev): Observable<any> {

    return this.http.post('/cart_product', {
      ProdId: ev.ProdId,
      cartId: ev.cartId,
      amount: ev.amount,
      totalPrice: ev.totalPrice
    }, httpOptions)
  }
  searchCart(ev): Observable<any> {
    return this.http.post('/search_cart', {
      customer: ev
    }, httpOptions)
  }
  searchOrder(ev): Observable<any> {
    return this.http.post('/search_order', {
      customer: ev
    }, httpOptions)
  }

  searchProducts(ev): Observable<any> {
    return this.http.post('/search_user_products', {
      cartId: ev
    }, httpOptions)
  }

  logout(): Observable<any> {
    return this.http.get('/logout');
  }

  register(userDetails): Observable<any> {

    return this.http.post("/register", {
      name: userDetails.form2.name.value,
      lastName: userDetails.form2.lastName.value,
      email: userDetails.form1.email.value,
      clientId: userDetails.form1.clientId.value,
      password: userDetails.form1.confirmPassword.value,
      city: userDetails.form2.city.value,
      street: userDetails.form2.street.value
    }, httpOptions)
  }
  lockCartProd(event: any): Observable<any> {
    return this.http.put('/cart_product', {
      cartId: event.cartId,
      generated: event.generated
    }, httpOptions)
  }
  lockCart(event: any): Observable<any> {
    return this.http.put('/cart', {
      customer: this.user._id,
      generated: event.generated
    }, httpOptions)
  }
  adminEditProduct(event): Observable<any> {
    return this.http.put('/product', {
      prodId: event.prodId,
      title: event.title,
      categoryType: event.categoryType,
      url: event.url,
      price: event.price
    }, httpOptions)
  }


  order(ev): Observable<any> {

    return this.http.post("/order", {
      customerId: ev.customerId,
      cartId: ev.cartId,
      finalPrice: ev.finalPrice,
      scheduled: ev.scheduled,
      city: ev.city,
      street: ev.street,
      generated: ev.generated,
      card: ev.card
    }, httpOptions)
  }

  addProduct(ev): Observable<any> {

    return this.http.post('/product', {
      title: ev.title,
      categoryType: ev.categoryType,
      url: ev.url,
      price: ev.price
    }, httpOptions);
  }

}
