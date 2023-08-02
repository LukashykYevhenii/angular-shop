import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

const PRODUCT_API = "http://localhost:8080/product"

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) {
  }

  getAllProducts(): Observable<any> {
    return this.http.get(PRODUCT_API + "/all");
  }


  getProductById(itemId: any): Observable<any> {
    return this.http.get(PRODUCT_API + "/" + itemId)
  }
}
