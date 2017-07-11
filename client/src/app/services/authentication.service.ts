import { Injectable } from '@angular/core';

@Injectable()
export class AuthenticationService {
  private auth: boolean;
  private user: any;
  constructor() {
    this.user = {};
    this.auth = false
  }
  getUser(){
    return this.user;
  }
  logout(){
    this.auth = false;
    this.user = {};
  }
  authenticated(){
    return this.auth;
  }
  authenticate(user){
    this.user = user;
    this.auth = true;
  }
}
