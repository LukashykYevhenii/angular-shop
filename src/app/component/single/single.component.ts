import {Component, OnInit} from '@angular/core';
import {ApiService} from 'src/app/service/api.service';
import {CartService} from 'src/app/service/cart.service';
import {ActivatedRoute} from "@angular/router";
import {ProductService} from "../../service/product.service";
import {FormGroup} from "@angular/forms";
import {ImageService} from "../../service/image.service";
import {UserService} from "../../service/user.service";
import {User} from "../../model/user";


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
  selectedFile!: File;
  productImage!: File;
  previewImgURL!: any;
  user!: User;


  constructor(private api: ApiService,
              private cartService: CartService,
              private route: ActivatedRoute,
              private productService: ProductService,
              private imageService: ImageService,
              private userService: UserService) {
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const itemId = params['id']; // Отримайте ідентифікатор товару з параметрів маршруту
      console.log("id =", itemId)

      this.userService.getCurrentUser().subscribe(user => {
        this.user = user;
      });

      this.productService.getProductById(itemId).subscribe(res => {
        this.item = res; // Отримайте інформацію про товар за ідентифікатором з API
        console.log("idProduct = " + this.item.idProduct);
        this.imageService.getImageToProduct(this.item.idProduct)
          .subscribe(data => {
            this.productImage = data.imageBytes;
            console.log("IMAGE = " + data.imageBytes)
            console.log("ID = " + data.idImage)
          });
      });
    });
  }

  addtocart(item: any) {
    this.cartService.addtoCart(item);
  }


  //завантаження файлу картинки до БД
  onUpload(item: any) {
    if (this.selectedFile != null) {
      this.imageService.uploadToProduct(this.selectedFile, item.idProduct)
        .subscribe(data => {
        })
    }
  }


  //метод викликається коли обираємо зображення
  // @ts-ignore
  onFileSelected(event): void {
    //записуємо у змінну обраний файл
    this.selectedFile = event.target.files[0];

    //при завантаженні одразу змінює картинку
    const reader = new FileReader();
    reader.readAsDataURL(this.selectedFile);
    reader.onload = (e) => {
      this.previewImgURL = reader.result;
    };
  }


  //додаємо формат для відображення картинки
  formatImage(img: any): any {
    if (img == null) {
      return null;
    }
    return 'data:image/jpeg;base64,' + img;
  }
}
