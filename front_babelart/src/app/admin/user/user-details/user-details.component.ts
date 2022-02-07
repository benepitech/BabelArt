import { Component, Input, OnInit } from '@angular/core';
import  IUserData  from 'src/app/types/user.type';
import { UserDataService } from '../../../_services/user.service';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {

  @Input() viewMode = false;

  @Input() currentUser: IUserData = {
    id:null,
    username: '',
    email: '',
    address: '',
    phone: '',
    password: '',
    password_confirmation: '',

  };
  
  message = '';

  constructor(
    private userService: UserDataService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    if (!this.viewMode) {
      this.message = '';
      this.getUser(this.route.snapshot.params["id"]);
    }
  }



  async getUser(id: any): Promise<void> {
    var result = await this.userService.getUser(id)
    this.currentUser = result.data.user
    console.log(result);
    
  }

  deleteUser(): void {
    console.log(this.route.snapshot.params["id"]);
    this.userService.deleteUser(this.route.snapshot.params["id"])

    
      .subscribe({
        next: (res) => {
          console.log(res);
          this.router.navigate(['/admin/users']);
        },
        error: (e) => console.error(e)
      });
  }


  updateProduct(): void {
    this.message = '';

    this.userService.update(this.route.snapshot.params["id"], this.currentUser)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.message = res.message ? res.message : 'This user was updated successfully!';
        },
        error: (e) => console.error(e)
      });
  }
}

