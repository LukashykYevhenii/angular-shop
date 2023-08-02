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
import {LoginComponent} from "./component/auth/login/login.component";
import {UserComponent} from "./component/user/user.component";
import {AuthGuardService} from "./service/auth-guard.service";

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'start', component: StartComponent, canActivate: [AuthGuardService]},
  {path: 'products', component: ProductsComponent, canActivate: [AuthGuardService]},
  {path: 'cart', component: CartComponent, canActivate: [AuthGuardService]},
  {path: 'single', component: SingleComponent, canActivate: [AuthGuardService]},
  {path: 'about', component: AboutComponent, canActivate: [AuthGuardService]},
  {path: 'checkout', component: CheckoutComponent, canActivate: [AuthGuardService]},
  {path: 'end', component: EndComponent, canActivate: [AuthGuardService]},
  {path: 'contact', component: ContactComponent, canActivate: [AuthGuardService]},
  {path: 'user', component: UserComponent, canActivate: [AuthGuardService]},
  {path: '', redirectTo: 'start', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
