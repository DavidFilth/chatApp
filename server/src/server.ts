import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as mongoose from 'mongoose';
import * as path from 'path';
import * as passport from 'passport';
import * as session from 'express-session';
import * as cookieParser from 'cookie-parser';
import * as socketIO from 'socket.io';

import {index} from './routes/index';
import {api} from './routes/api';

// Create the express app and features
let app = express();
let port = process.env.PORT || 3000;
let mongoUrl = process.env.MONGO || 'mongodb://localhost/Chat';

//Connect to mongoDB
let db = mongoose.connect(mongoUrl, function(err){
    if(err){
        console.error(err);
    } else{
        console.log('Succesfully connected to ', mongoUrl);
    }
});

// Body Parser MW
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());

// Set Static Folder
app.use(express.static(path.join(__dirname, '../../client/dist')));

// Express Session
app.use(session({
    secret: 'Te amo werita hermosa',
    saveUninitialized: true,
    resave: true
}));

// Passport Init
app.use(passport.initialize());
app.use(passport.session());

// Set routers
app.use('/', index);
app.use('/api', api);

// Start server
let server = app.listen(port, (err)=>{
    if(err){
        console.error(err);
    }
    console.log('Server started at port', port);
});
let io = socketIO(server);

io.on('connection', function (socket) {
    socket.join(socket.handshake.query.userId);
    socket.on('disconnect', ()=> {console.log('user disconected')});
});