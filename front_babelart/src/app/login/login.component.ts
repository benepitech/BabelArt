import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { TokenStorageService } from '../_services/token-storage.service';
import {} from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: any = {
    email: null,
    password: null
  };
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: any = {} ;
  user: any;

  constructor(private authService: AuthService, private tokenStorage: TokenStorageService) { }

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      console.log('loggin true')
      this.isLoggedIn = true;
    }
    this.getUserinfo();
  }

  onSubmit(): void {
    const { email, password } = this.form;

    this.authService.login(email, password).subscribe({
      next: data => {
        this.tokenStorage.saveToken(data.token);
        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.reloadPage();
      },
      error: err => {
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
      }
    });
    
  }

  async getUserinfo(): Promise<any>{
    let result = await this.tokenStorage.getUser()    
    this.user = result.user;
    this.roles = this.user.role_id;
    console.log(this.roles, this.user);
    
  }

  reloadPage(): void {
    window.location.reload();
  }
}