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
  getMessages( conversationId : string ){
    return this.http.get('/api/user/search/conversationMessages/' + conversationId).map(function(data){
      return data.json() ;
    });
  }
  sendFriendshipRequest(data){
    var headers = new Headers(); 
    headers.append('Content-Type', 'application/json');
    return this.http.post('/api/user/sendFriendshipRequest',JSON.stringify(data), {headers: headers})
      .map(function(res){
        return res.json();
      });
  }
  resolveFriendshipRequest(data){
    var headers = new Headers(); 
    headers.append('Content-Type', 'application/json');
    return this.http.post('/api/user/resolveFriendRequest', JSON.stringify(data), {headers: headers})
      .map(function(res){
        return res.json();
      })
  }
  postMessage(data){
    let headers = new Headers();
    headers.append('Content-type', 'application/json');
    return this.http.post('/api/user/postMessage', JSON.stringify(data), {headers: headers})
      .map(function(res){
        return res.json();
      });
  }
  createConversation(data: customTypes.Conversation){
    let headers = new Headers();
    headers.append('Content-type', 'application/json');
    return this.http.post('/api/user/createConversation', JSON.stringify(data), {headers: headers})
      .map(res => res.json());
  }
  clearUnreadMessages(userId: string, conversationId: string){
    let headers = new Headers();
    headers.append('Content-type', 'application/json');
    return this.http.post('/api/user/clearUnreadMessage', JSON.stringify({userId, conversationId}), {headers: headers})
      .map(res => res.json())
  }
  updateUserInfo(data){
    let headers = new Headers();
    headers.append('Content-type', 'application/json');
    return this.http.post('/api/user/updateInfo', JSON.stringify(data), {headers: headers})
      .map(res => res.json());
  }
}
