import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/user.service';
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

  constructor(private userService: UserService, private categoryService: CategoryDataService ) { }

  ngOnInit(): void {
    this.userService.getPublicContent().subscribe({
      next: data => {
        this.content = data;
      },
      error: err => {
        this.content = JSON.parse(err.error).message;
      }
    });
    this.retrieveCategories();
  }
  
  async retrieveCategories(): Promise<any> {
    var result = await this.categoryService.getAll();
   
    this.categories= result.data.categories
    console.log(this.categories);
  }
}
