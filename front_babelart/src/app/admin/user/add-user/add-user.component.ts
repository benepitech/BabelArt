import { Component, OnInit } from '@angular/core';
import { UserService} from '../../../_services/user.service';
import {} from 'rxjs';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css'],
})
export class AddUserComponent implements OnInit {
  errors?: null;
  form: any = {
    role_id: null,
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

  constructor(private userService: UserService) {}

  ngOnInit(): void {}

  onSubmit(): void {
    const { role_id, username, email, address, phone, password, password_confirmation } =
      this.form;
      console.log("this.form", this.form)
    if (password !== password_confirmation) {
      this.errorMessage = "Passwords do not match !";
      console.log(this.errorMessage)
      return
    } else {
      this.userService
        .create(this.form)
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
