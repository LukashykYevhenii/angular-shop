import {Component, OnInit} from '@angular/core';
import {CartService} from 'src/app/service/cart.service';


@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  cartItems: any[] = [];
  grandTotal: number = 0;
  constructor(private cartService: CartService) {
  }

  ngOnInit(): void {
    //this.cartItems = this.cartService.getCartItems();
     this.cartService.getCartDetails().subscribe(items=>{
         // @ts-ignore
         this.cartItems = items;
    });
    this.grandTotal = this.cartService.getTotalPrice();
  }

  emptyCart() {
    this.cartService.removeAllCart();
  }

}
