import {Component, OnInit} from '@angular/core';
import {CartService} from 'src/app/service/cart.service';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.css']
})
export class StartComponent implements OnInit {
  searchKey: string = "";

  constructor(private cartService: CartService) {
  }

  ngOnInit(): void {
    this.cartService.search.subscribe((val: any) => {
      this.searchKey = val;
    })
  }
}
