import { Component, Directive, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { UsersService } from '../../services/users.service';
import { ValidatorsService } from '../../services/validators.service';
import { MessagesService } from '../../services/messages.service';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-add-contact',
  templateUrl: './add-contact.component.html',
  styleUrls: ['./add-contact.component.css']
})
export class AddContactComponent{
  private user : customTypes.User;
  formModel: FormGroup;
  constructor(
    private usersServ: UsersService, 
    private validators: ValidatorsService, 
    private fb: FormBuilder, 
    private message: MessagesService,
    private auth: AuthenticationService) {
      this.user = this.auth.getUser();
      this.formModel = fb.group({
        'email': ['', Validators.email, validators.existingEmail]
      });
  }
  sendFriendRequest(){
    let context = this;
    let input = this.formModel.value;
    if(input.email === this.user.email ){
      this.message.emit({content:"You can't send a friend request to yourself", type: "alert-warning" });
    } else{
      this.usersServ.sendFriendshipRequest({
          userId: this.user.id,
          contact: input.email})
        .subscribe(function(data: any){
          if(data.status === 0) {
            context.message.emit({content:`Your request has been sent to ${data.name}`, type: "alert-info" });
          }
          if(data.status === 1) {
            context.message.emit({content:`${data.name} is already in your contact list`, type: "alert-warning" });
          }
          if(data.status === 2) {
            context.message.emit({content:`You have already send a request to ${data.name}`, type: "alert-warning" });
          }
          if(data.status === 3){
            context.message.emit({content:`You have a pending friend request from ${data.name}`, type: "alert-warning" });
          }
        });
    }
  }
  hasError(field, valid, optional){
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
