import {Component, OnInit} from '@angular/core';
import {ApiService} from 'src/app/service/api.service';
import {CartService} from 'src/app/service/cart.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  public productList: any;
  public filterCategory: any;
  public searchKey: string = "";

  public minPrice: number = 0;
  public maxPrice: number = 0;

  constructor(private api: ApiService, private cartService: CartService) {
  }

  ngOnInit(): void {
    this.api.getProduct()
      .subscribe(res => {
        this.productList = res;
        this.filterCategory = res;
        this.productList.forEach((a: any) => {
          Object.assign(a, {quantity: 1, total: a.price});
        });
        console.log(this.productList)
      });

    this.cartService.search.subscribe((val: any) => {
      this.searchKey = val;
    })
  }

  addToCart(item: any) {
    this.cartService.addtoCart(item);
  }

  filter(category: string) {
    this.filterCategory = this.productList
      .filter((a: any) => {
        if (a.category == category || category == '') {
          return a;
        }
      })
  }

  sortByPriceDesc() {
    this.filterCategory.sort((a: any, b: any) => {
      return b.price - a.price;
    });
  }

  sortByPriceAsc() {
    this.filterCategory.sort((a: any, b: any) => {
      return a.price - b.price;
    });
  }

  sortByNameAsc() {
    this.filterCategory.sort((a: any, b: any) => {
      return a.title.localeCompare(b.title);
    });
  }

  sortByNameDesc() {
    this.filterCategory.sort((a: any, b: any) => {
      return b.title.localeCompare(a.title);
    });
  }

  sortByRelevance() {
    this.filterCategory.sort((a: any, b: any) => {
      return b.rating.rate - a.rating.rate;
    });
  }

  // calculatePriceRange(): void {
  //   const prices = this.productList.map((item: any) => item.price);
  //   this.minPrice = Math.min(...prices);
  //   this.maxPrice = Math.max(...prices);
  // }

  // filterByPrice(): void {
  //   const minPrice = parseInt((<HTMLInputElement>document.getElementById('slider-range')).value.split(',')[0]);
  //   const maxPrice = parseInt((<HTMLInputElement>document.getElementById('slider-range')).value.split(',')[1]);
  //
  //   this.filterCategory = this.productList.filter((item: any) => {
  //     return item.price >= minPrice && item.price <= maxPrice;
  //   });
  // }
}
