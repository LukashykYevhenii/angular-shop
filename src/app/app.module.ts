import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import {AppComponent } from './app.component';
import {RouterModule} from "@angular/router";
import {HeaderComponent} from "./component/header/header.component";
import {CartComponent} from "./component/cart/cart.component";
import {ProductsComponent} from "./component/products/products.component";
import { HttpClientModule } from '@angular/common/http';
import {authInterceptorProviders} from "./service/auth-interceptor.service";
import { FilterPipe } from './shared/filter.pipe';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AppRoutingModule} from "./app-routing.module";
import { StartComponent } from './component/start/start.component';
import { SingleComponent } from './component/single/single.component';
import { FooterComponent } from './component/footer/footer.component';
import { AboutComponent } from './component/about/about.component';
import { EndComponent } from './component/end/end.component';
import { CheckoutComponent } from './component/checkout/checkout.component';
import { ContactComponent } from './component/contact/contact.component';
import { LoginComponent } from './component/auth/login/login.component';
import { RegisterComponent } from './component/auth/register/register.component';
import { UserComponent } from './component/user/user.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    CartComponent,
    ProductsComponent,
    FilterPipe,
    StartComponent,
    SingleComponent,
    FooterComponent,
    AboutComponent,
    EndComponent,
    CheckoutComponent,
    ContactComponent,
    LoginComponent,
    RegisterComponent,
    UserComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [authInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
