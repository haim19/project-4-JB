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

  constructor(private http: HttpClient) { }

  login(ev): Observable<any> {

    return this.http.post("/login", {
      email: ev.email.value,
      password: ev.password.value
    }, httpOptions)
  }

  checkId(details): Observable<any> {

    return this.http.post("/checkid", {
      clientId:details.id,
      email:details.email
    }, httpOptions)
  }

  checkSession():Observable<any>{

    return this.http.get('/prelog');
  }

  getProducts(): Observable<any>{
    return this.http.get('/products');
  }
  getCategories(): Observable<any>{
    return this.http.get('/categories');
  }



  register(userDetails): Observable<any> {
    debugger;
    return this.http.post("/register", {
      name:userDetails.form2.name.value,
      lastName: userDetails.form2.lastName.value,
      email: userDetails.form1.email.value,
      clientId: userDetails.form1.clientId.value,
      password: userDetails.form1.confirmPassword.value,
      city: userDetails.form2.city.value,
      street: userDetails.form2.street.value
    }, httpOptions)


  }

}

