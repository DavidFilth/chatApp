import { Component } from '@angular/core';

import { UsersService } from '../../services/users.service'

@Component({
  selector: 'app-user-tools',
  templateUrl: './user-tools.component.html',
  styleUrls: ['./user-tools.component.css']
})
export class UserToolsComponent {
  user: {};
  constructor(private userServ: UsersService) {
    this.user = userServ.getUser();
  }

}
