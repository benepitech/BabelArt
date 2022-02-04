import { Component, Input, OnInit } from '@angular/core';
import ICartData from '../../../types/cart.type'
import  CartDataService  from '../../../_services/cart.service';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-cart-details',
  templateUrl: './cart-details.component.html',
  styleUrls: ['./cart-details.component.css']
})
export class CartDetailsComponent implements OnInit {

  @Input() viewMode = false;

  @Input() currentCart: ICartData = {
    product_id: null,
    id: null,
    buyer_id: null,
    seller_id: null,
    amount: null

  };
  
  message = '';

  constructor(
    private cartService: CartDataService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    if (!this.viewMode) {
      this.message = '';
      this.getCart(this.route.snapshot.params["id"]);
    }
  }



  async getCart(id: any): Promise<void> {
    var result = await this.cartService.get(id)
    this.currentCart = result.data.cart
    console.log(result);
    
  }

  deleteCart(): void {
    console.log(this.route.snapshot.params["id"]);
    this.cartService.delete(this.route.snapshot.params["id"])
    
    
      .subscribe({
        next: (res) => {
          console.log(res);
          this.router.navigate(['/admin/carts']);
        },
        error: (e) => console.error(e)
      });
  }

}