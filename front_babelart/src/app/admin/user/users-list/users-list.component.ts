import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/_services/user.service';
import { User } from 'src/app/types/user.model';
import { findIndex } from 'rxjs';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css'],
})
export class UsersListComponent implements OnInit {
  content?: string;
  users: any = [];

  constructor(private userService: UserService) {}

  ngOnInit(): void {

    this.userService.getUsers().subscribe({
      next: (data) => {
        console.log('dataUser', data);
        this.users = data.data.users;
        console.log('datasUsers', this.users);
      },
      error: (e) => console.error(e),
    });
  }
  removeUser(id: number): void {
    this.userService.deleteUser(id).subscribe(() => {
      console.log('user deleted sucessfully!');
    });
  }
}
