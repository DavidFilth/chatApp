import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { equalValidator } from './customValidators';
import { UsersService } from '../../services/users.service';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  providers: [UsersService]
})
export class SignupComponent {
  formModel: FormGroup;
  constructor(fb: FormBuilder, private usersService: UsersService ) {
    this.formModel = fb.group({
      'name': ['Juan', Validators.required],
      'username': ['Juan1234', [Validators.required, Validators.minLength(6)]],
      'email': ['a@b.com', Validators.email],
      'passwordGroup': fb.group({
        'password': ['123456', [Validators.required, Validators.minLength(6)]],
        'pconfirm': ['123456']
      }, { validator: equalValidator})
    });
  }
  signUp(){
    let  {name, username, email, passwordGroup: {password: password} } = this.formModel.value;
    this.usersService.signUpUser({name, username, email, password}).subscribe(data =>{
      console.log(data);
    });
  }
}

