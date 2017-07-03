import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [UsersService]
})
export class LoginComponent {
  loginForm: FormGroup;
  constructor(fb: FormBuilder, private usersService: UsersService) {
    this.loginForm = fb.group({
      'username': ['Juan1234', [Validators.required, Validators.minLength(6)]],
      'password': ['123456', [Validators.required, Validators.minLength(6)]]
    });
  }
  logUser(){
    let {username, password} = this.loginForm.value
    this.usersService.logIn({username, password}).subscribe(data =>{
      console.log('data received = ', data);
    })
  }
}