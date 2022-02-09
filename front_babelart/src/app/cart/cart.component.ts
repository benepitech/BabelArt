import { Component, OnInit } from '@angular/core';
import  CartDataService  from '../_services/cart.service';
import { TokenStorageService } from '../_services/token-storage.service';
import  ProductDataService  from '../_services/product.service';
import { UserDataService } from '../_services/user.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  carts: any;
  user: any;
  cartIsEmpty: boolean = true
  products: any;
  sum: number | undefined;
  constructor(private productService: ProductDataService,
              private cartService: CartDataService, 
              private tokenService: TokenStorageService,
              private userService: UserDataService) 
              { }

  ngOnInit(): void {
    this.getUserinfo();

  }


  async getUserinfo(): Promise<any>{
        var products_array: Array<object> = [];
        let result = await this.tokenService.getUser()    
    this.user = result.user; 
        let array_carts =  await this.cartService.getCartsByBuyer(result.user.id);
    this.carts = array_carts.data.carts;
        if(this.carts) {
          this.cartIsEmpty = false; 
          await this.carts.forEach(async (element:any) =>  { 
            let  resultat = await this.productService.get(element.product_id)          
            products_array.push(resultat.data.product)
    this.products = products_array
          })
        }
        if(this.user.id) {
          await this.cartService.sumOfCart(this.user.id)
          .subscribe({
            next: (res) => {
              console.log(res.data);
    this.sum = res.data;
            },
            error: (e) => console.error(e)
          });
        }
  }

  purchase(){
    let data = {status : 1};
    this.products.forEach((element:any) => {
      this.productService.update(element.id, data).subscribe({
        next: (data:any) => {
          console.log(data);
          
        },
        error: (e) => console.error(e)
      }),
      this.userService.addSale(element.seller_id).subscribe({
        next: (data:any) => {
          console.log(data);
          
        },
        error: (e) => console.error(e)
      })
    });
    this.carts.forEach((element:any) => {
      this.cartService.delete(element.id).subscribe({
        next: (data:any) => {
          console.log(data);
          
        },
        error: (e) => console.error(e)
      })
    })
    window.location.replace('/')
  }


 
}
