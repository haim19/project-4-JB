import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { ShopService } from 'src/app/services/shop.service';
import { Subscriber } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  user: any;
  cities: string[] = ["ירושלים", "תל אביב", "חיפה", "ראשון לציון", "פתח תקווה", "אשדוד", "נתניה", "באר שבע", "חולון", "בני ברק"];
  submitted: boolean = false;
  wrongId: string;
  wrongEmail: string;
  emailPassError: string;
  step2: boolean = false;
  alreadyRegistered: boolean = true;

  constructor(private shopService: ShopService,private router:Router) { }
  loginForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required]),
    password: new FormControl(null, [Validators.required])
  })

  registerForm_step1: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    clientId: new FormControl(null, [Validators.required, Validators.min(99999)]),
    choosePassword: new FormControl(null, [Validators.required, Validators.minLength(5)]),
    confirmPassword: new FormControl(null, [Validators.required])
  })
  registerForm_step2: FormGroup = new FormGroup({
    name: new FormControl(null, [Validators.required]),
    lastName: new FormControl(null, [Validators.required]),
    city: new FormControl(null, [Validators.required]),
    street: new FormControl(null, [Validators.required])
  })
  loginSubmit() {
    this.submitted = true;
    if (this.loginForm.valid) {
      this.shopService.login(this.loginForm.controls).subscribe(data => {
        if (!data) {
          this.emailPassError = "wrong email or password";
        }
        else {
          this.user = data;
          debugger;
        }
      })
    }
    else this.emailPassError = "wrong email or password ";
  }
  //email.errors.email
  get getLog() {
    return this.registerForm_step1.controls
  }
  get getLog2() {
    return this.registerForm_step2.controls
  }

  regSubmit() {
    this.submitted = true;
    if (!this.step2) {
      if (this.registerForm_step1.valid && this.getLog.choosePassword.value === this.getLog.confirmPassword.value) {
        this.shopService.checkId({ id: this.getLog.clientId.value, email: this.getLog.email.value }).subscribe(data => {
          if (!data) {
            this.step2 = true;
            this.submitted = false;
          }
          else {
            if (data.msg) {
              this.wrongEmail = data.msg;
            }
            else {
              this.wrongId = "wrong ID";
            }
          }
        })
      }
    }

    else {
      this.shopService.register({ form1: this.getLog, form2: this.getLog2 }).subscribe(data => {
        debugger;
        this.user = data;
      })
    }


  }
  enterShop(){

    this.router.navigate(['/shop']);
  }

  ngOnInit() {

    this.registerForm_step2.controls.city.setValue(this.cities[0]);
    this.shopService.checkSession().subscribe(data => {
      if (data.user) {
        this.user = data.user;
      }
    })
  }

}
