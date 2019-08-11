import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './comps/home/home.component';
import { ShopComponent } from './comps/shop/shop.component';

const routes: Routes = [
  {path:'', component:HomeComponent},
  {path:'shop',component:ShopComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash:true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
