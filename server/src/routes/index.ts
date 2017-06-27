import * as express from 'express';

let router = express.Router();

router.get('/', (req,res)=>{
    res.render('index.html');
})

export {router as index}