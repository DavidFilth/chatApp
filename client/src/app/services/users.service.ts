import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class UsersService {
  private auth: boolean = false;
  public user;
  constructor(private http: Http ) {
    this.user = {};
  }
  getUser(){
    return this.user;
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
  searchUser(id){
    return this.http.get('api/search/user/id/' + id).map(function(data){
      return data.json() ;
    })
  }
  friendshipRequest(data){
    var headers = new Headers(); 
    headers.append('Content-Type', 'application/json');
    return this.http.post('api/user/sendFriendshipRequest',JSON.stringify(data), {headers: headers})
      .map(function(res){
        return res.json();
      });
  }
  resolveRequest(data){
    var headers = new Headers(); 
    headers.append('Content-Type', 'application/json');
    return this.http.post('api/user/resolveFriendRequest', JSON.stringify(data), {headers: headers})
      .map(function(res){
        return res.json();
      })
  }
}
