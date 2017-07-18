import { Component } from '@angular/core';

import { UsersService } from '../../services/users.service'
import { AuthenticationService } from '../../services/authentication.service'

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent{
  contacts : customTypes.contactInfo[];
  constructor(private usersServ: UsersService, private authService: AuthenticationService) {
    this.contacts  = this.authService.getUser().contacts;
  }
}
