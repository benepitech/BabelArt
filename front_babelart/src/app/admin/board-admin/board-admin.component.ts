import { Component, OnInit } from '@angular/core';
import { UserDataService } from '../../_services/user.service';


@Component({
  selector: 'app-board-admin',
  templateUrl: './board-admin.component.html',
  styleUrls: ['./board-admin.component.css'],
})
export class BoardAdminComponent implements OnInit {
  content?: string;
  users: any = [];

  constructor(private userService: UserDataService) {}

  ngOnInit(): void {
  


}
}