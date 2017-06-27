import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as mongoose from 'mongoose';
import * as path from 'path';

import {index} from './routes/index';
import {api} from './routes/api';

// Create the express app and features
let app = express();
let port = process.env.PORT || 3000;
let mongoUrl = process.env.MONGO || 'mongodb://localhost/Chat' 

//Connect to mongoDB
let db = mongoose.connect(mongoUrl, function(err){
    if(err){
        console.error(err);
    } else{
        console.log('Succesfully connected to ', mongoUrl);
    }
});

// Set Static Folder
app.use(express.static(path.join(__dirname, '../../client/dist')));

// Body Parser MW
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// Set routers
app.use('/', index);
app.use('/api', api);

// Start server
app.listen(port, (err)=>{
    if(err){
        console.error(err);
    }
    console.log('Server started at port', port);
})