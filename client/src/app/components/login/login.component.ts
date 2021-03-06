import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router'

import { UsersService } from '../../services/users.service';
import { MessagesService } from '../../services/messages.service';
import { AuthenticationService } from '../../services/authentication.service';


import 'rxjs/add/operator/catch';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {
  formModel: FormGroup;
  constructor(public fb: FormBuilder, 
              public usersService: UsersService,
              public router: Router,
              public messages: MessagesService,
              public authService: AuthenticationService){
    this.formModel = fb.group({
      'email': ['', Validators.email ],
      'password': ['', [Validators.required, Validators.minLength(6)]]
    });
  }
  logUser(){
    let {email, password} = this.formModel.value;
    this.usersService.logIn({email, password})
      .catch((error, caught) =>{
        this.messages.emit({ content: "There's something wrong with the username or the password, please try again", type: 'alert-danger'})
        return [];
      }).subscribe(data =>{
        this.authService.authenticate(data);
        this.router.navigateByUrl('/dashboard');
        this.messages.emit({ content: 'You are now logged in', type: 'alert-info'})
      });
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