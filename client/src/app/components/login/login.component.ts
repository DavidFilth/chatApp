import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router'

import { UsersService } from '../../services/users.service';

import 'rxjs/add/operator/catch';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {
  loginForm: FormGroup;
  messageError: string;
  constructor(fb: FormBuilder, 
              private usersService: UsersService,
              private router: Router){
    this.loginForm = fb.group({
      'username': ['', [Validators.required, Validators.minLength(6)]],
      'password': ['', [Validators.required, Validators.minLength(6)]]
    });
  }
  logUser(){
    let {username, password} = this.loginForm.value;
    this.usersService.logIn({username, password})
      .catch((error, caught) =>{
        return [];
      }).subscribe(data =>{
        this.router.navigateByUrl('/dashboard');
      });
  }
}