import { Component, OnInit } from '@angular/core';

import { UsersService } from '../../services/users.service'

@Component({
  selector: 'app-add-contact',
  templateUrl: './add-contact.component.html',
  styleUrls: ['./add-contact.component.css']
})
export class AddContactComponent{
  constructor(private usersServ: UsersService) {}
  addFriend(data){
    let context = this;
    this.usersServ.searchByEmail(data.email).subscribe(data =>{
      context.usersServ.addContact(data.id).subscribe(function(d){
        console.log('data recibed =', d);
      })
    })
  }
}
