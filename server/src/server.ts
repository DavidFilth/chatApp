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
    let userId = socket.handshake.query.userId;
    console.log('user connected');
    socket.join(userId);
    socket.on('disconnect', ()=> {console.log('user disconected')})
        .on('acceptFriendRequest', (data)=>{
            console.log('acceptFriend Emited');
            socket.broadcast.to(data.room).emit('acceptedFriendRequest',data.contact);
        }).on('sendFriendRequest', (data)=>{
            console.log('sendFriend Emited');
            socket.broadcast.to(data.room).emit('incomingFriendRequest', data.contact);
        }).on('typing',(data)=>{
            for(let i = 0; i < data.rooms.length; i++){
                socket.broadcast.to(data.rooms[i]).emit('userIsTyping', {conversation: data.conversation, contact: data.contact});
            }
        }).on('stopTyping',(data)=>{
            for(let i = 0; i < data.rooms.length; i++){
                socket.broadcast.to(data.rooms[i]).emit('userStopTyping', {conversation: data.conversation, contact: data.contact});
            }
        }).on('sendMessage',(data)=>{
            for(let i =0; i < data.rooms.length; i++){
                socket.broadcast.to(data.rooms[i]).emit('message', {message: data.message, conversationId: data.conversation});
            }
        }).on('newConversation', (data)=>{
            for(let i = 0; i < data.rooms.length; i++)
            socket.broadcast.to(data.rooms[i]).emit('incomingConversation', data.conversation);
        });
});