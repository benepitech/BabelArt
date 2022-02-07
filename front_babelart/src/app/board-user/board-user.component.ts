import { Component, OnInit } from '@angular/core';
import { UserDataService } from '../_services/user.service';

@Component({
  selector: 'app-board-user',
  templateUrl: './board-user.component.html',
  styleUrls: ['./board-user.component.css']
})
export class BoardUserComponent implements OnInit {
  content?: string;

  constructor(private userService: UserDataService) { }

  ngOnInit(): void {

  }
}