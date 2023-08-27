import {Component, OnInit} from '@angular/core';
import {ApiService} from 'src/app/service/api.service';
import {CartService} from 'src/app/service/cart.service';
import {ProductService} from "../../service/product.service";
import {ImageService} from "../../service/image.service";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  public productList: any;
  public filterCategory: any;
  public searchKey: string = "";

  constructor(private api: ApiService,
              private cartService: CartService,
              private productService: ProductService,
              private imageService: ImageService) {
  }

  ngOnInit(): void {
    this.productService.getAllProducts()
      .subscribe(res => {
        this.productList = res;
        this.filterCategory = res;
        this.productList.forEach((a: any) => {
          Object.assign(a, {quantity: 1, total: a.price});

          //виклик методу що завантажує картинки для
          //кожного продукту
          this.getImagesToProducts(this.productList);
        });
        console.log(this.productList)
      });

    this.cartService.search.subscribe((val: any) => {
      this.searchKey = val;
    })
  }

  addToCart(item: any) {
    this.cartService.addtoCart(item);
    this.cartService.addToCartServer(item).subscribe(
      (response) => {console.log(response)},
      (error) =>{console.log(error)}
    );
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

  formatImage(img: any): any {
    if (img == null) {
      return null;
    }
    return 'data:image/jpeg;base64,' + img;
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


  //отримаємо зображення для кожного продукту на сторінці по id
  private getImagesToProducts(productList: any[]) {
    productList.forEach(p => {
      this.imageService.getImageToProduct(p.idProduct)
        // @ts-ignore
        .subscribe(data => {
          p.image = data.imageBytes;
        })
    });
  }
}
