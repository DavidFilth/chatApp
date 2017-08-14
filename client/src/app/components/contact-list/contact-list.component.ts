import { Component, Input, Output, EventEmitter } from '@angular/core';

import { UsersService } from '../../services/users.service'
import { AuthenticationService } from '../../services/authentication.service'

@Component({
  selector: 'contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent{
  @Input() contacts : customTypes.contact[];
  @Output() contactSelected = new EventEmitter();
  constructor(public usersServ: UsersService, public authService: AuthenticationService){
  }
}
