import * as express from 'express';
import { User } from '../model/user';
import { Conversation } from '../model/conversation'
import { Message } from '../model/message'

let userRoute = express.Router();

userRoute.get('/search/conversationMessages/:id', function (req, res) {
  Message.find({conversation: req.params.id})
    .populate({ path: 'from', select: '_id name username email' })
    .exec((err, data) => {
      if (err) {
        res.send(err);
      } else {
        res.send(data);
      }
    });
});

userRoute.post('/sendFriendshipRequest', function (req, res) {
  User.findOne({ email: req.body.contact }, function (err, contact: any) {
    if (err) {
      res.send(err)
    }
    User.findById(req.body.userId, function (error, user: any) {
      if (error) {
        res.send(error);
      }
      else {
        let contactInfo = {
          _id: contact._id,
          name: contact.name,
          username: contact.username,
          email: contact.email
        }
        // check if there's a pending request of that contact
        if (user.pendingRequests.indexOf(contact._id) !== -1) {
          res.send({ status: 3, contact: contactInfo });
        }
        //check if there's already  on the contacts list
        else if (contact.contacts.indexOf(req.body.userId) !== -1) {
          res.send({ status: 1, contact: contactInfo });
        }
        //check if there's already a pending friend from you
        else if (contact.pendingRequests.indexOf(req.body.userId) !== -1) {
          res.send({ status: 2, contact: contactInfo });
        }
        else {
          contact.pendingRequests.push(req.body.userId);
          contact.save();
          res.send({ status: 0, contact: contactInfo });
        }
      }
    });
  });
});
userRoute.post('/resolveFriendRequest', function (req, res) {
  User.findById(req.body.userId, function (err, user: any) {
    if (err) {
      res.send(err);
    } else if (user) {
      let index = user.pendingRequests.indexOf(req.body.contactId);
      user.pendingRequests.splice(index, 1);
      user.save();
      if (!req.body.response) {
        res.send({ status: false });
      }
      else {
        user.contacts.push(req.body.contactId);
        user.save();
        User.findById(req.body.contactId, function (err2, contact: any) {

          if (err2) {
            res.send(err)
          } else {
            contact.contacts.push(req.body.userId);
            contact.save();
            res.send({ status: true, contactName: contact.name });
          }
        });
      }
    }
  });
});
userRoute.post('/postMessage', function (req, res) {
  var newMessage = new Message(req.body.message);
  newMessage.save((err, message: any)=>{
    if(err){
      res.send(err);
    } else {
      Conversation.findById(message.conversation).exec((err, conversation : any)=>{
        if(err){
          res.send(err);
        } else{
          for(let i=0; i < conversation.participants.length; i++){
            User.findById(conversation.participants[i]).exec((err, user : any)=>{
              if(err){
                res.send(err);
              }else{
                let index = user.conversations.findIndex(conv => String(conv.info) === String(conversation._id));
                if(index === -1){
                  user.conversations.push({
                    unreadMessages: String(message.from) !== String(user._id) ? 1 : 0,
                    info: conversation._id
                  });
                } else if(String(message.from) !== String(user._id)){
                  user.conversations[index].unreadMessages++;
                }
                user.save();
              }
            });
          }
          conversation.lastMessage = message._id;
          conversation.save();
        }
      });
      res.send(message);
    }
  });
});
userRoute.post('/createConversation', function (req, res) {
  if (req.body.type === 'ptop') {
    Conversation.findOne({ type: req.body.type, participants: {$all:req.body.participants.map(contact=>contact._id )}})
      .populate('participants', '_id name username email')
      .exec((err, data) => {
        if (err) {
          res.send(err);
        } else if (!data) {
          let newConv = new Conversation(req.body);
          newConv.populate({ path: 'participants', select: '_id name username email' }, (popError) => {
            newConv.save((saveError, conv) => {
              if (saveError) {
                res.send(saveError);
              } else {
                res.send(conv);
              }
            });
          });
        } else {
          res.send(data);
        }
      });
  } else {
    let newConv = new Conversation(req.body)
    newConv.populate({ path: 'participants', select: '_id name username email' }, (popError) => {
      newConv.save((err, conv: any) => {
        if (err) {
          res.send(err);
        } else if (!conv) {
          res.send(conv);
        } else {
          for (let i = 0; i < conv.participants.length; i++) {
            User.findById(conv.participants[i], (err, user: any) => {
              if (err) {
                res.send(err);
              } else if (!user) {
                res.send(user)
              } else {
                user.conversations.push({
                  unreadMessages: 1,
                  info: conv._id
                });
                user.save();
              }
            });
          }
          res.send(conv);
        }
      });
    });
  }
});
userRoute.post('/clearUnreadMessage', function(req, res){
  User.findById(req.body.userId).exec((err, user :any)=>{
    if(err){
      res.send(err);
    } else{
      if(user){
        let index = user.conversations.findIndex(conv => String(conv.info) === String(req.body.conversationId));
        if(index !== -1){
          user.conversations[index].unreadMessages = 0;
          user.save();
        }
      }
      res.send({status: true});
    }
  });
});
userRoute.post('/updateInfo', function(req, res){
  User.findById(req.body.userId).exec((err, user : any)=>{
    if(err){
      res.send(err);
    } else{
      if(req.body.username){
        user.username = req.body.username;
      }
      if(req.body.language){
        user.language = req.body.language;
      }
      user.save();
    }
  });
});
export { userRoute }