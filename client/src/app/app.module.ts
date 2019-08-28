import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {ReactiveFormsModule, FormsModule} from '@angular/forms';
import{HttpClientModule} from'@angular/common/http';
import { NgHighlightModule } from 'ngx-text-highlight';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './comps/home/home.component';
import { ShopComponent } from './comps/shop/shop.component';
import { OrdersComponent } from './comps/orders/orders.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ShopComponent,
    OrdersComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    NgHighlightModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
