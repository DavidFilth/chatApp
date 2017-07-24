import * as express from 'express';
import { User } from '../model/user';
import { Conversation } from '../model/conversation'
import { Message } from '../model/message'

let userRoute = express.Router();

// Get user's name and username
userRoute.get('/search/contact/:id', function (req, res) {
  User.findById(req.params.id, function (err, data: any) {
    if (err) {
      console.error(err);
      res.send(err);
    }
    if (!data) {
      res.send(data);
    }
    res.send({ _id: data._id, name: data.name, email: data.email, username: data.username });
  });
});
userRoute.get('/search/conversation/:id', function (req, res) {
  Conversation.findById(req.params.id, function (err, data: any) {
    if (err) {
      res.send(err);
    } else if (!data) {
      res.send(data);
    } else {
      res.send(data);
    }
  })
});
userRoute.get('/search/message/:id', function (req, res) {
  Message.findById(req.params.id, function (err, data) {
    if (err) {
      res.send(err);
    } else if (!data) {
      res.send(data);
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
          res.send({ status: 3, contact: contactInfo});
        }
        //check if there's already  on the contacts list
        else if (contact.contacts.indexOf(req.body.userId) !== -1) {
          res.send({ status: 1, contact: contactInfo});
        }
        //check if there's already a pending friend from you
        else if (contact.pendingRequests.indexOf(req.body.userId) !== -1) {
          res.send({ status: 2, contact: contactInfo});
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
  newMessage.save((err, message) => {
    if (err) {
      res.send(err);
    } else if (!message) {
      res.send(message);
    } else {
      Conversation.findById(req.body.conversationId, (error, conversation: any) => {
        if (error) {
          res.send(error)
        } else if (!conversation) {
          res.send(conversation);
        } else {
          if (conversation.messages.length === 0 && conversation.type === 'ptop' ) {
            for (let i = 0; i < conversation.participants.length; i++) {
              User.findById(conversation.participants[i], (err, user: any) => {
                if (err) {
                  res.send(err);
                } else if (!user) {
                  res.send(user)
                } else {
                  user.conversations.push(conversation._id);
                  user.save();
                }
              });
            }
          }
          conversation.messages.push(message._id);
          conversation.save();
          res.send(message);
        }
      });
    }
  });
});
userRoute.post('/createConversation', function (req, res) {
  if (req.body.type === 'ptop') {
    Conversation.findOne({ type: req.body.type, participants: req.body.participants }, (err, data) => {
      if (err) {
        res.send(err);
      } else if (!data) {
        let newConv = new Conversation(req.body);
        newConv.save((error, conv) => {
          if (error) {
            res.send(error);
          } else {
            res.send(conv);
          }
        })
      } else {
        res.send(data);
      }
    });
  } else {
    let newConv = new Conversation(req.body);
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
              user.conversations.push(conv._id);
              user.save();
            }
          });
        }
        res.send(conv);
      }
    });
  }
});
export { userRoute }