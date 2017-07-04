import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class UsersService {
  private auth: boolean = false;
  private user;
  constructor(private http: Http ) {
    this.user = {};
  }
  signUpUser(user){
    var headers = new Headers(); 
    headers.append('Content-Type', 'application/json');
    return this.http.post('/api/register', JSON.stringify(user), {headers: headers})
      .map( res => res.json());
  }
  logIn(user: any){
    var headers = new Headers(); 
    headers.append('Content-Type', 'application/json');
    return this.http.post('/api/login', JSON.stringify(user), {headers: headers})
      .map( res => {
        this.auth = true;
        this.user = res.json();
        return this.user;
      });
  }
  logout(){
    this.auth = false;
    this.user = {};
  }
  authenticated(){
    return this.auth;
  }

}
