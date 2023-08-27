import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {HttpClient} from "@angular/common/http";
const CART_API = "http://localhost:8080/cart";
@Injectable({
  providedIn: 'root'
})
export class CartService {

  public cartItemList: any = []
  public productList = new BehaviorSubject<any>([]);
  public search = new BehaviorSubject<string>("");


  constructor(private http : HttpClient) {
  }

  getProducts() {
    return this.productList.asObservable();
  }

  // setProduct(product: any) {
  //   this.cartItemList.push(...product);
  //   this.productList.next(product);
  // }

  addtoCart(product: any) {
    const cartItem = {
      ...product,
      quantity: 1,
      total: product.price
    };
    this.cartItemList.push(cartItem);
    this.productList.next(this.cartItemList);
    this.getTotalPrice();
    console.log(this.cartItemList)
    console.log(this.productList)
  }

  getTotalPrice(): number {
    let grandTotal = 0;
    this.cartItemList.map((a: any) => {
      grandTotal += a.total;
    })
    return grandTotal;
  }

  removeCartItem(product: any) {
    this.cartItemList.map((a: any, index: any) => {
      if (product.idProduct === a.idProduct) {
        this.cartItemList.splice(index, 1);
      }
    })
    this.productList.next(this.cartItemList);
  }

  removeAllCart() {
    this.cartItemList = []
    this.productList.next(this.cartItemList);
  }

  getCartItems() {
    return this.cartItemList;
  }

  addToCartServer(item: any) {
    return this.http.get(CART_API + "/addToCart/" + item.idProduct)
  }

  getCartDetails() {
    return this.http.get(CART_API + "/getCartDetails")
  }
}
