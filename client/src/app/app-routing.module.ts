import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './comps/home/home.component';
import { ShopComponent } from './comps/shop/shop.component';
import { OrdersComponent } from './comps/orders/orders.component';

const routes: Routes = [
  {path:'', component:HomeComponent},
  {path:'shop',component:ShopComponent},
  {path:'orders',component:OrdersComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash:true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
