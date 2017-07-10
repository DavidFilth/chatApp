import * as express from 'express';
import { User } from '../model/user';

let search = express.Router();

// Get user's name and username
search.get('/user/id/:id', function(req, res){
  User.findById(req.params.id, function(err, data: any){
    if(err){
      console.error(err);
      res.send(err);
    }
    res.send({name: data.name, username: data.username});
  });
});
search.get('/user/email/:email', function(req, res){
    User.findOne({email: req.params.email}, function(err, data: any){
        if(err){
            res.send(err);
        }
        res.send({id: data._id});
    })
})

export {search}