import {Component, OnInit} from '@angular/core';
import {UserService} from "../../service/user.service";
import {ImageService} from "../../service/image.service";
import {ProductService} from "../../service/product.service";
import {User} from "../../model/user";
import {TokenStorageService} from "../../service/token-storage.service";


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  user!: User;
  selectedFile!: File;
  userProfileImage!: File;
  previewImgURL!: any;
  isUserDataLoaded: boolean = false;


  constructor(private tokenStorageService: TokenStorageService,
              private userService: UserService,
              private imageService: ImageService,
              private productService: ProductService) {
  }

  ngOnInit(): void {
    this.userService.getCurrentUser()
      .subscribe(data => {
        this.user = data;
        console.log("username = " + this.user.username)
        this.isUserDataLoaded = true;
      });

    this.imageService.getImageToUser()
      .subscribe(data => {
        this.userProfileImage = data.imageBytes;
      });

  }


  //завантаження файлу картинки до БД
  onUpload() {
    if (this.selectedFile != null) {
      this.imageService.uploadToUser(this.selectedFile)
        .subscribe(data => {
          console.log("upload data = " + data)
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

  formatImage(img: any): any {
    if (img == null) {
      return null;
    }
    return 'data:image/jpeg;base64,' + img;
  }

}
