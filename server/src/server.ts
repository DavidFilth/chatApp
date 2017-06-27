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
mongoose.connect(mongoUrl);

//View Engine
app.set('views', path.join(__dirname, '../../client/dist'));
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

// Set Static Folder
app.use(express.static(path.join(__dirname, '../../client')));

// Body Parser MW
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// Set routers
app.use('/', index);
app.use('/api', api);