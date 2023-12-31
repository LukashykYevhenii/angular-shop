import { Injectable } from '@angular/core';
import {MatSnackBar} from "@angular/material/snack-bar";


@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  // private snackBar : MatSnackBar
  constructor(private snackBar : MatSnackBar){}

  public showSnackBar(message: string): void {
    this.snackBar.open(message, null!, {duration: 2000});
  }
}
