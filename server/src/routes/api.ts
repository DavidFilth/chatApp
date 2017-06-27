import * as express from 'express';

let router = express.Router();

router.get('user', (req,res) =>{
    res.send({user: 'Juan', password: '123'});
});

export {router as api}