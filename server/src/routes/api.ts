import * as express from 'express';
import { User } from '../model/user';
import * as passport from 'passport';
import * as passportLocal from 'passport-local';

let router = express.Router();
let LocalStrategy = passportLocal.Strategy;

// Passport Configuration 
passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
});
// Set up the Local Strategy 
passport.use(new LocalStrategy(
  function(username, password, done) {
    User.findOne({ username: username }, function (err, user: any) {
      if (err) { return done(err); }
      if (!user) {
        return done(null, false);
      }
      if (user.password !==  password) {
        return done(null, false);
      }
      return done(null, user);
    });
  }
));

// Register a User 
router.post('/register', (req,res, next) =>{
    var newUser = new User(req.body);
    newUser.save((err,data) =>{
        if(err){
            res.send(new Error(err));
        }
        console.log("User successfully saved ", data);
        res.send(data);
    });
});

// Login a User
router.post('/login',
  passport.authenticate('local'),
  function(req, res : any) {
    res.json(req.user);
  });
export {router as api}