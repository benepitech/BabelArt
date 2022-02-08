import { Component, OnInit } from '@angular/core';
import ProductDataService from '../_services/product.service';
import {ActivatedRoute} from '@angular/router';


@Component({
  selector: 'app-products-result',
  templateUrl: './products-result.component.html',
  styleUrls: ['./products-result.component.css']
})
export class ProductsResultComponent implements OnInit {
  results:any
  products: any 
  constructor(private productService: ProductDataService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.retrieveProducts();
  }

  async retrieveProducts(): Promise<any> {
    var products_for_sale: Array<object> = [];
     this.route.params.subscribe( async (params) => {
      if (this.route.snapshot.queryParams['category']) {
      var result = await this.productService.getbyCategory(this.route.snapshot.queryParams['category'])
      
         console.log(result.data['products'])
      this.results = result.data['products']
      console.log(this.results)
      }
      this.results.forEach((element:any) => {

        
        if (element.status == 0){
          products_for_sale.push(element)
      this.products = products_for_sale
      console.log(this.products);
      
        } 
        
      });
      
    })
  }
}