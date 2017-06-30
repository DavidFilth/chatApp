import * as express from 'express';
import { User } from '../model/user';

let router = express.Router();

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

export {router as api}