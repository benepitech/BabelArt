import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from '../_services/token-storage.service';
import ProductDataService from '../_services/product.service';
import CategoryDataService from '../_services/category.service';
import IProductData from '../types/product.type';
import ICategoryData from '../types/category.type';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {

  product: IProductData = {
    name: '',
    description: '',
    price: '',
    seller_id: 1,
    category_id: 0,
    status: false,
    image: null
  };
  categories: ICategoryData[] = []
  submitted = false;
  selectedImage: File | null = null ;
  user?: any;


  constructor(private tokenService: TokenStorageService, private productService: ProductDataService, private categoryService: CategoryDataService) { }

  ngOnInit(): void {
    this.retrieveCategories();
    this.getUserinfo();
  }


  async retrieveCategories(): Promise<any> {
    var result = await this.categoryService.getAll();
   
    this.categories= result.data.categories
    console.log(this.categories);
  }

  
  onImageSelected(event:any) {
    this.selectedImage = <File>event.target.files[0];
  } 

  saveProduct(): void {
    const data = {
      name: this.product.name,
      price: this.product.price,
      description: this.product.description,
      image: this.selectedImage,  
      seller_id: this.user.id,             
      category_id: this.product.category_id,       
      status: this.product.status
                
    };
    console.log(this.selectedImage);
    

    this.productService.create(data)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.submitted = true;
        },
        error: (e) => console.error(e)
      });
  }

  async getUserinfo(): Promise<any>{
    let result = await this.tokenService.getUser()    
    this.user = result.user;
    console.log(this.user.user_id);
  }

  newProduct(): void {
    this.submitted = false;
    this.product = {
      name: '',
      description: '',
      price: '',
      image: null,
      seller_id: 1,
      category_id: 1,
      status: true 
    };
  }

}
