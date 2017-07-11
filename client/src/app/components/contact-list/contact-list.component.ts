import { Component } from '@angular/core';

import { UsersService } from '../../services/users.service'
import { AuthenticationService } from '../../services/authentication.service'

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent{
  contacts : Object[] = [];
  constructor(private usersServ: UsersService, private authService: AuthenticationService) {
    /*this.contacts = [
      {name: 'David'},
      {name: 'Juan'},
      {name: 'tu puta madre'}
    ];*/
    let contacts : any[] = this.authService.getUser().contacts;
    let context = this;
    for(let i = 0; i < contacts.length; i++){
      this.usersServ.searchUser(contacts[i])
        .subscribe(function(data){
          context.contacts.push(data);
        });
    }
  }
}
