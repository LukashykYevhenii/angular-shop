import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {map} from 'rxjs/operators';
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) {
  }

  getProduct() {
    return this.http.get<any>("https://fakestoreapi.com/products")
      .pipe(map((res: any) => {
        return res;
      }))
  }

  getProductById(itemId: number): Observable<any> {
    const url = `https://fakestoreapi.com/products/${itemId}`; // Замените на URL вашего API для получения информации о товаре по идентификатору
    console.log('URL=' + url)
    return this.http.get(url);
  }

  getCartItems(): Observable<any[]> {
    return this.http.get<any[]>(`https://fakestoreapi.com/cart/items`);
  }

}
