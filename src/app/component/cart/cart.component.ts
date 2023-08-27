import {Component, OnInit} from '@angular/core';
import {CartService} from 'src/app/service/cart.service';
import {Product} from "../../model/product";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  public products: any = [];
  public grandTotal !: number;

  constructor(private cartService: CartService) {
  }

  ngOnInit(): void {
    this.cartService.getProducts()
      .subscribe(res => {
        this.products = res;
        this.grandTotal = this.cartService.getTotalPrice();
      })
  }

  removeItem(item: any) {
    this.cartService.removeCartItem(item);
  }

  emptyCart() {
    this.cartService.removeAllCart();
  }

  increaseQuantity(item: any) {
    item.quantity += 1;
    this.calculateTotal(item);
    this.grandTotal = this.cartService.getTotalPrice();
  }

  calculateTotal(item: any) {
    item.total = item.price * item.quantity;
  }

  decreaseQuantity(item: any) {
    if (item.quantity > 1) {
      item.quantity -= 1;
      this.calculateTotal(item);
      this.grandTotal = this.cartService.getTotalPrice();

    }
  }

  formatImage(img: any): any {
    if (img == null) {
      return null;
    }
    return 'data:image/jpeg;base64,' + img;
  }

}
