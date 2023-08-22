import {Component, OnInit} from '@angular/core';
import {AbstractControl, UntypedFormBuilder, UntypedFormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../../service/auth.service";
import {Router} from "@angular/router";
import {TokenStorageService} from "../../../service/token-storage.service";
import {NotificationService} from "../../../service/notification.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  loginForm!: UntypedFormGroup;

  constructor(private authService: AuthService,
              private fb: UntypedFormBuilder,
              private router: Router,
              private tokenStorageService: TokenStorageService,
              private notificationService: NotificationService) {

    if (this.tokenStorageService.getUser()) {
      this.router.navigate(["/products"]);
    }
  }

  ngOnInit(): void {
    this.loginForm = this.createLoginForm();
  }

  get f(): { [key: string]: AbstractControl } {
    return this.loginForm.controls;
  }

  private createLoginForm(): UntypedFormGroup {
    return this.fb.group({
      username: ['', Validators.compose([Validators.required])],
      password: ['', Validators.compose([Validators.required])]
    });
  }


  // submit() {
  //   this.authService.login({
  //     username: this.loginForm.value.username,b v ghmjfgv bnvm
  //     password: this.loginForm.value.password
  //   }).subscribe(data => {
  //     console.log("username" + data.username)
  //     console.log("password" + data.password)
  //     this.router.navigate(['/']);
  //     window.location.reload();
  //   }, error => {
  //     console.log("error = " + error);
  //     console.log("error = " + error.value);
  //     console.log("error = " + error.password);
  //     console.log("error = " + error.error);
  //   });
  // }

  submit(): void {
    this.authService.login({
      username: this.loginForm.value.username,
      password: this.loginForm.value.password
    }).subscribe(
      data => {
        console.log("username: " + data.username);
        console.log("password: " + data.password);
        console.log("token: " + data.token);
        this.tokenStorageService.saveToken(data.token);
        this.tokenStorageService.saveUser(data);
        this.router.navigate(['/']);
        window.location.reload();
      },
      error => {
        console.log("Error login = :", error);
        this.notificationService.showSnackBar(error.message)
      }
    );
  }


}
