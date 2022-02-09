import { Component, Input, OnInit } from '@angular/core';
import { UserDataService } from '../_services/user.service';
import ProductDataService from '../_services/product.service';
import {ActivatedRoute} from '@angular/router';
import CartDataService from '../_services/cart.service';
import { TokenStorageService } from '../_services/token-storage.service';
import IProductData from '../types/product.type';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.css']
})
export class ProductPageComponent implements OnInit { 
  errorMessage = '';
  @Input() isInCart = false
  content?: string;
  id?:string;
  user?: any;
  product: IProductData = {} 


  constructor(private tokenService: TokenStorageService ,private userService: UserDataService, private route: ActivatedRoute, private productService: ProductDataService, private cartDataService: CartDataService) { }

  ngOnInit(): void {
  

     this.getProduct(this.route.snapshot.params["id"]);
    this.getUserinfo();
    
  }


  async getProduct(id: string): Promise<any> {
    if (id){
    var result = await this.productService.get(id)
    this.product = result.data.product
    }
  }

  async getUserinfo(): Promise<any>{
    let result = await this.tokenService.getUser()    
    this.user = result.user;
  }
        
  
 
   addToCart(){
    let data = { buyer_id : this.user.id, product_id : this.product.id, seller_id: this.product.seller_id, amount: this.product.price}
    this.cartDataService.create(data).subscribe({
      next: (data: any) => {
        console.log(data.status);
        if (data.status === 200)this.isInCart = true;
        else if (data.status === 202) this.isInCart = false;
        console.log(this.isInCart);
          
      },
      error: err => {
        this.errorMessage = err.error.message;
      }
    })
  } 



           
                          
      


 
 
}




