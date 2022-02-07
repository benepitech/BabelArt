import { Component, OnInit } from '@angular/core';
import { UserDataService } from '../../../_services/user.service';
import  IUserData  from 'src/app/types/user.type';


@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {

  users?: any;
  currentUser: IUserData = {
    username: '',
    email: '',
    address: '',
    phone: '',
    password: '',
    password_confirmation: '',
  };
  currentIndex = -1;
  id = 0;
  name: any;

  constructor(private userService: UserDataService) { }

  ngOnInit(): void {
    this.retrieveUsers();
  }



  async retrieveUsers(): Promise<any> {
    var result = await this.userService.getAll();
 
   
    this.users= result.data.users;
    console.log(this.users);
  }


  setActiveUser(user: IUserData, index: number): void {
    this.currentUser = user;
    this.currentIndex = index;
  }



  async searchName(): Promise<any> {
    this.currentUser = {};
    this.currentIndex = -1;
  
    var result = await this.userService.findByName(this.name);
    this.users= result.data.users
  }

}

