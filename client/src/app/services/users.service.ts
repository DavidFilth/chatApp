import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class UsersService {
  constructor(private http: Http ) {}
  signUpUser(user){
    var headers = new Headers(); 
    headers.append('Content-Type', 'application/json');
    return this.http.post('/api/register', JSON.stringify(user), {headers: headers})
      .map( res => res.json());
  }
  logIn(user){
    var headers = new Headers(); 
    headers.append('Content-Type', 'application/json');
    return this.http.post('/api/login', JSON.stringify(user), {headers: headers})
      .map( res => {
        return res.json();
      });
  }
  searchUser(id){
    return this.http.get('api/user/search/id/' + id).map(function(data){
      return data.json() ;
    })
  }
  sendFriendshipRequest(data){
    var headers = new Headers(); 
    headers.append('Content-Type', 'application/json');
    return this.http.post('api/user/sendFriendshipRequest',JSON.stringify(data), {headers: headers})
      .map(function(res){
        return res.json();
      });
  }
  resolveFriendshipRequest(data){
    var headers = new Headers(); 
    headers.append('Content-Type', 'application/json');
    return this.http.post('api/user/resolveFriendRequest', JSON.stringify(data), {headers: headers})
      .map(function(res){
        return res.json();
      })
  }
}
