import { Component, OnInit } from '@angular/core';
import { UserService} from '../../../_services/user.service';
import {} from 'rxjs';

@Component({
  selector: 'app-form-user',
  templateUrl: './form-user.component.html',
  styleUrls: ['./form-user.component.css'],
})
export class FormUserComponent {
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

 
}
 
 
 
 
 
 

