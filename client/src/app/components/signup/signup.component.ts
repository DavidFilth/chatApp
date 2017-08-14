import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms'
import { Router } from '@angular/router';

import { ValidatorsService } from '../../services/validators.service'
import { UsersService } from '../../services/users.service';
import { MessagesService } from '../../services/messages.service';

import 'rxjs/add/operator/map';

@Component({
  selector: 'signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent {
  formModel: FormGroup;
  constructor(fb: FormBuilder, public usersService: UsersService, public router: Router, validServ: ValidatorsService, public messages: MessagesService){
    this.formModel = fb.group({
      'name': ['', Validators.required],
      'username': ['', [Validators.required, Validators.minLength(6)]],
      'email': ['', Validators.email, validServ.availableEmail],
      'passwordGroup': fb.group({
        'password': ['', [Validators.required, Validators.minLength(6)]],
        'pconfirm': ['']
      }, { validator: validServ.equalValidator}),
      'language':['en']
    });
  }
  signUp(){
    let  {name, username, email, language, passwordGroup: {password: password} } = this.formModel.value;
    this.usersService.signUpUser({name, username, email, password, language}).subscribe(data =>{
      this.router.navigateByUrl('/login');
      this.messages.emit({content: 'You are now registered', type:'alert-info'});
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