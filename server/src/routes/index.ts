import * as express from 'express';

let router = express.Router();

router.get('/', (req,res)=>{
    res.redirect('/en');
})

export {router as index}