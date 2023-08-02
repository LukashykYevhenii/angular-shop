import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

const AUTH_API = "http://localhost:8080/api/auth/";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) {
  }

  public login(user: any): Observable<any> {
    console.log("service username = " + user.username)
    console.log("service password = " + user.password)
    return this.http.post(AUTH_API + "signin", {
      username: user.username,
      password: user.password
    });
  }


  public register(user: any): Observable<any> {
    return this.http.post(AUTH_API + "signup", {
      name: user.name,
      username: user.username,
      password: user.password,
      email: user.email
    });
  }
}
