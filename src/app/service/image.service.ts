import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";


const IMAGE_API = "http://localhost:8080/image/"

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  constructor(private http: HttpClient) {
  }

  uploadToProduct(file: File, productId: number): Observable<any> {
    const upData = new FormData();
    upData.append("file", file);
    console.log("productId ===" + productId)
    return this.http.post(IMAGE_API + productId + "/upload", upData);
  }

  getImageToProduct(productId: number): Observable<any> {
    console.log("getImageToProduct = " + productId)
    return this.http.get(IMAGE_API + productId);
  }

  getImageToUser(): Observable<any> {
    return this.http.get(IMAGE_API + "userImage");
  }

  uploadToUser(selectedFile: File): Observable<any> {
    const uploadData = new FormData();
    uploadData.append("file", selectedFile);
    return this.http.post(IMAGE_API + "upload", uploadData);
  }
}
