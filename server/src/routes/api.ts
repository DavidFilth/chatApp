import * as express from 'express';

import * as passport from 'passport';
import * as passportLocal from 'passport-local';

import { User } from '../model/user';
import { search } from './search';

let router = express.Router();
let LocalStrategy = passportLocal.Strategy;

// Passport Configuration 
passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (id, done) {
  User.findById(id, function (err, user) {
    done(err, user);
  });
});
// Set up the Local Strategy 
passport.use(new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password'
},
  function (email, password, done) {
    User.findOne({ email: email }, function (err, user: any) {
      if (err) { return done(err); }
      if (!user) {
        return done(null, false);
      }
      if (user.password !== password) {
        return done(null, false);
      }
      return done(null, user);
    });
  }
));

// Register a User 
router.post('/register', (req, res, next) => {
  var newUser = new User(req.body);
  newUser.save((err, data) => {
    if (err) {
      res.send(new Error(err));
    }
    console.log("User successfully saved ", data);
    res.send(data);
  });
});

// Login a User
router.post('/login',
  passport.authenticate('local'),
  function (req, res: any) {
    res.json(req.user);
  });

router.post('/addcontact', function (req, res) {
  User.findByIdAndUpdate(req.body.userId, { $push: { contacts: req.body.contactId } }, function (err, data) {
    if (err) {
      res.send(err);
    }
    console.log(data);
    res.send('que pedito');
  });
});

router.get('/availableEmail/:email', function (req, res) {
  User.findOne({ email: req.params.email }, function (err, data) {
    if (err) {
      res.send(err);
    }
    res.send({available: data === null});
  });
});
router.post('/user/sendFriendshipRequest', function(req, res){
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
router.post('/user/resolveFriendRequest', function(req, res){
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
            res.send({status: true});
          }
        });
      }
    }
  })
});

router.use('/search', search);

export { router as api }