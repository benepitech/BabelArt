import { Component, OnInit } from '@angular/core';
import { UserDataService } from '../_services/user.service';
import CategoryDataService from '../_services/category.service';
import ICategoryData from '../types/category.type';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  content?: string;
  categories?: ICategoryData[];

  constructor(private userService: UserDataService, private categoryService: CategoryDataService ) { }

  ngOnInit(): void {

    this.retrieveCategories();
  }
  
  async retrieveCategories(): Promise<any> {
    var result = await this.categoryService.getAll();
   
    this.categories= result.data.categories
    console.log(this.categories);
  }
}
