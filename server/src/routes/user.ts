import * as express from 'express';
import { User } from '../model/user';
import { Conversation } from '../model/conversation'
import { Message } from '../model/message'

let userRoute = express.Router();

// Get user's name and username
userRoute.get('/search/contact/:id', function(req, res){
  User.findById(req.params.id, function(err, data: any){
    if(err){
      console.error(err);
      res.send(err);
    }
    if(!data){
      res.send(data);
    }
    res.send({id: data._id, name: data.name, email: data.username});
  });
});
userRoute.get('/search/conversation/:id', function(req, res){
  Conversation.findById(req.params.id, function(err, data : any){
    if(err){
      res.send(err);
    } else if(!data){
      res.send(data);
    } else{
      res.send(data);
    }
  })
});
userRoute.get('/search/message/:id', function(req, res){
  Message.findById(req.params.id, function(err, data){
    if(err){
      res.send(err);
    } else if(!data){ 
      res.send(data);
    } else{
      res.send(data);
    }
  });
});
userRoute.post('/sendFriendshipRequest', function(req, res){
  User.findOne({email: req.body.contact},function(err, contact :any){
    if(err){
      res.send(err)
    }
    User.findById(req.body.userId, function(error, data : any){
      if(error){
        res.send(error);
      }
      else{
        if(data.pendingRequests.indexOf(contact._id) !== -1){
          res.send({status: 3, name: contact.name})
        }
      //check if there's already  on the contacts list
      else if(contact.contacts.indexOf(req.body.userId) !== -1){
        res.send({status: 1, name: contact.name});
      }
      //check if there's already a pending friend request
      else if(contact.pendingRequests.indexOf(req.body.userId) !== -1 ){
        res.send({status: 2, name: contact.name});
      }
      else{
        contact.pendingRequests.push(req.body.userId);
        contact.save();
        res.send({status: 0, name: contact.name});
      }
      }
    });
  });
});
userRoute.post('/resolveFriendRequest', function(req, res){
  User.findById(req.body.userId, function(err, user : any){
    if(err){
      res.send(err);
    } else if(user){
      let index = user.pendingRequests.indexOf(req.body.contactId);
      user.pendingRequests.splice(index, 1);
      user.save();
      if(!req.body.response){
        res.send({status: false});
      }
      else{
        user.contacts.push(req.body.contactId);
        user.save();
        User.findById(req.body.contactId, function(err2, contact: any){

          if(err2){
            res.send(err)
          } else{
            contact.contacts.push(req.body.userId);
            contact.save();
            res.send({status: true, contactName: contact.name});
          }
        });
      }
    }
  });
});
export {userRoute}