import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import {} from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: '../register/register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  errors?: null;
  form: any = {
    username: null,
    email: null,
    address: null,
    phone: null,
    password: null,
    password_confirmation: null,
  };
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';

  constructor(private authService: AuthService) {}

  ngOnInit(): void {}

  onSubmit(): void {
    const { username, email, address, phone, password, password_confirmation } =
      this.form;
    if (password !== password_confirmation) {
      this.errorMessage = "Passwords do not match !";
      console.log(this.errorMessage)
      return
    } else {
      this.authService
        .register(
          username,
          email,
          address,
          phone,
          password,
          password_confirmation
        )
        .subscribe({
          next: (data) => {
            console.log(data);
            this.isSuccessful = true;
            this.isSignUpFailed = false;
          },
          error: (err) => {
            console.log('register failed');
            this.errorMessage = err.message;
            console.log('this.errorMessage', this.errorMessage);
            this.isSignUpFailed = true;
          },
        });
    }
  }
}
