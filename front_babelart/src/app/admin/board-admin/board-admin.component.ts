import { Component, OnInit } from '@angular/core';
import { UserService } from '../../_services/user.service';
import { User } from 'src/app/types/user.model';
import { findIndex } from 'rxjs';
import { UsersListComponent } from '../user/users-list/users-list.component';

@Component({
  selector: 'app-board-admin',
  templateUrl: './board-admin.component.html',
  styleUrls: ['./board-admin.component.css'],
})
export class BoardAdminComponent implements OnInit {
  content?: string;
  users: any = [];

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.getAdminBoard().subscribe({
      next: (data) => {
        this.content = data;
      },
      error: (err) => {
        this.content = JSON.parse(err.error).message;
      },
    });

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
