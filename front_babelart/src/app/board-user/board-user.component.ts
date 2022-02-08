import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from '../_services/token-storage.service';
import ProductDataService from '../_services/product.service';

@Component({
  selector: 'app-board-user',
  templateUrl: './board-user.component.html',
  styleUrls: ['./board-user.component.css']
})
export class BoardUserComponent implements OnInit {
  content?: string;
  user:any;
  myProducts:any;
  for_sale:any;
  sold:any;

  constructor(private tokenService: TokenStorageService, private productService: ProductDataService) { }

  ngOnInit(): void {
    this.getUserinfo();
  }


  async getUserinfo(): Promise<any>{
    var products_for_sale: Array<object> = [];
    var products_sold: Array<object> = [];
        let result = await this.tokenService.getUser()    
    this.user = result.user;
        console.log(this.user);
        if (result.user){
          var myProducts = await this.productService.getbySeller(result.user.id) 
    this.myProducts = myProducts.data.products;
        if (this.myProducts){
          this.myProducts.forEach((element:any) => {
            if (element.status == 0){
              products_for_sale.push(element)
              this.for_sale = products_for_sale
              console.log(this.for_sale);
              
            }
            else if (element.status == 1){
              products_sold.push(element)
              this.sold = products_sold
              console.log(this.sold);
              
            }
          })
        }  
    }   
  }
}