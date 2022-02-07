import { Component, OnInit } from '@angular/core';
import  IUserData  from 'src/app/types/user.type';
import  {UserDataService}  from '../../../_services/user.service';
import { AuthService } from 'src/app/_services/auth.service';
@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})

export class AddUserComponent implements OnInit {

  user: any = {
    username: '',
    email: '',
    address: '',
    phone: '',
    password: '',
    password_confirmation: '',
  };
  submitted = false;


  constructor(private userService: UserDataService, private authService: AuthService) { }

  ngOnInit(): void {
  }

  saveUser(): void {
    const { username, email, address, phone, password, password_confirmation } = this.user;
    this.authService.register(  username,
                                email,
                                address,
                                phone,
                                password,
                                password_confirmation)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.submitted = true;
        },
        error: (e) => console.error(e)
      });
  }

  newUser(): void {
    this.submitted = false;
    this.user = {
      username: '',
      email: '',
      address: '',
      phone: '',
      password: '',
      password_confirmation: '',
    };
  }

}