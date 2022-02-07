import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from '../_services/token-storage.service';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.css']
  })
  export class NavbarComponent implements OnInit {

   
  role_id?: number;
  isLoggedIn:boolean = false;
  showAdminBoard = false;
  username?: string;
  user: any;

  constructor(private tokenStorageService: TokenStorageService) { }

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorageService.getToken();

    if (this.isLoggedIn) {
      this.getUserinfo();
    }
  }

  async getUserinfo(): Promise<any>{
    let result = await this.tokenStorageService.getUser()    
    this.user = result.user;
    console.log(this.user.username);
    this.username = this.user.username;
    if(result.user.role_id == 1) this.showAdminBoard = true;

  }
  
  

  logout(): void {
    this.tokenStorageService.signOut();
    window.location.reload();
  }
  
}

