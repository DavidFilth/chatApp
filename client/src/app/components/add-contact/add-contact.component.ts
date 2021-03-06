import { Component, Directive, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { UsersService } from '../../services/users.service';
import { ValidatorsService } from '../../services/validators.service';
import { MessagesService } from '../../services/messages.service';
import { SocketService } from '../../services/socket.service';

@Component({
  selector: 'add-contact',
  templateUrl: './add-contact.component.html',
  styleUrls: ['./add-contact.component.css']
})
export class AddContactComponent{
  @Input() user : customTypes.User;
  formModel: FormGroup;
  constructor(
    public usersServ: UsersService, 
    public validators: ValidatorsService, 
    public fb: FormBuilder, 
    public message: MessagesService,
    public socket: SocketService) {
      this.formModel = fb.group({
        'email': ['', Validators.email, validators.existingEmail]
      });
  }
  sendFriendRequest(){
    let input = this.formModel.value;
    if(input.email === this.user.email ){
      this.message.emit({content:"You can't send a friend request to yourself", type: "alert-warning" });
    } else{
      this.usersServ.sendFriendshipRequest({
          userId: this.user._id,
          contact: input.email})
        .subscribe((data: customTypes.friendRequest) =>{
          if(data.status === 0) {
            this.message.emit({content:`Your request has been sent to ${data.contact.name}`, type: "alert-info" });
            this.socket.sendFriendRequest(data.contact._id, {
              _id: this.user._id,
              name: this.user.name,
              username: this.user.username,
              email: this.user.email
            });
          }
          if(data.status === 1) {
            this.message.emit({content:`${data.contact.name} is already in your contact list`, type: "alert-warning" });
          }
          if(data.status === 2) {
            this.message.emit({content:`You have already send a request to ${data.contact.name}`, type: "alert-warning" });
          }
          if(data.status === 3){
            this.message.emit({content:`You have a pending friend request from ${data.contact.name}`, type: "alert-warning" });
          }
        });
    }
  }
  hasError(field, valid?, optional?){
    let control: any = this.formModel.get(field);
    if(control instanceof FormGroup){
      if(valid === undefined && optional === undefined){
        return !(control.errors === null) && !control.pristine;
      }
      control = control.controls[valid];
      valid = optional;
    }
    if(control.errors === null){
      return false;
    }
    if( valid === undefined){
      return true && !control.pristine;
    }
    return control.errors[valid] && !control.pristine;
  }
}
