import {Component, OnInit} from '@angular/core';
import {ApiService} from 'src/app/service/api.service';
import {CartService} from 'src/app/service/cart.service';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-single',
  templateUrl: './single.component.html',
  styleUrls: ['./single.component.css']
})
export class SingleComponent implements OnInit {

  public productList: any;
  public filterCategory: any
  searchKey: string = "";

  public item: any;

  constructor(private api: ApiService, private cartService: CartService, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const itemId = params['id']; // Получите идентификатор товара из параметров маршрута
      console.log("id =", itemId)
      this.api.getProductById(itemId).subscribe(res => {
        this.item = res; // Получите информацию о товаре по идентификатору из API
      });
      console.log("id= "+ this.item.id)
      console.log("title = "+this.item.title)
    });
  }

  addtocart(item: any) {
    this.cartService.addtoCart(item);
  }

}
