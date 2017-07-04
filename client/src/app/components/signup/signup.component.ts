import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { equalValidator } from './customValidators';
import { UsersService } from '../../services/users.service';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent {
  formModel: FormGroup;
  constructor(fb: FormBuilder, private usersService: UsersService ) {
    this.formModel = fb.group({
      'name': ['', Validators.required],
      'username': ['', [Validators.required, Validators.minLength(6)]],
      'email': ['', Validators.email],
      'passwordGroup': fb.group({
        'password': ['', [Validators.required, Validators.minLength(6)]],
        'pconfirm': ['']
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

