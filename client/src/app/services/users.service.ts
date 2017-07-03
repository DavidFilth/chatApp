import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class UsersService {

  constructor(private http: Http) {}

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
      .map( res => console.log(res));
  }

}
