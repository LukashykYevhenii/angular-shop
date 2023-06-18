import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CartComponent} from './component/cart/cart.component';
import {ProductsComponent} from './component/products/products.component';
import {StartComponent} from './component/start/start.component';
import {SingleComponent} from "./component/single/single.component";
import {AboutComponent} from "./component/about/about.component";
import {CheckoutComponent} from "./component/checkout/checkout.component";
import {EndComponent} from "./component/end/end.component";
import {ContactComponent} from "./component/contact/contact.component";

const routes: Routes = [
  {path: '', redirectTo: 'start', pathMatch: 'full'},
  {path: 'start', component: StartComponent},
  {path: 'products', component: ProductsComponent},
  {path: 'cart', component: CartComponent},
  {path: 'cart', component: CartComponent},
  {path: 'single', component: SingleComponent},
  {path: 'about', component: AboutComponent},
  {path: 'checkout', component: CheckoutComponent},
  {path: 'end', component: EndComponent},
  {path: 'contact', component: ContactComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
