import { Component, OnInit } from '@angular/core';
import ICartData from '../../../types/cart.type'
import  CartDataService  from '../../../_services/cart.service';


@Component({
  selector: 'app-carts-list',
  templateUrl: './carts-list.component.html',
  styleUrls: ['./carts-list.component.css']
})
export class CartsListComponent implements OnInit {

  carts?: any;
  currentCart: ICartData = {
    product_id: null,
    id: null,
    buyer_id: null,
    seller_id: null,
    amount: null
  };
  currentIndex = -1;
  id = 0;

  constructor(private cartService: CartDataService) { }

  ngOnInit(): void {
    this.retrieveCarts();
  }



  async retrieveCarts(): Promise<any> {
    var result = await this.cartService.getAll();
 
   
    this.carts= result.data.carts;
    console.log(this.carts);
  }


  setActiveCart(cart: ICartData, index: number): void {
    this.currentCart = cart;
    this.currentIndex = index;
  }



  searchId(): void {
    this.currentCart = {
      id : null,
      buyer_id : null,
      product_id : null,
      amount: null,
      seller_id: null
    };
    this.currentIndex = -1;

    this.cartService.findById(this.id)
      .subscribe({
        next: (data) => {
          this.carts = data;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }

}