import * as mongoose from 'mongoose';

let Schema = mongoose.Schema;
let conversationSchema = new Schema({
    name: String,
    type: String,
    participants: [{type: Schema.Types.ObjectId , ref: 'User'}],
    usersTyping: {type: Array, default: []},
    lastMessage: {type: Schema.Types.ObjectId, ref: 'Message'},
    admin: {type: Schema.Types.ObjectId, ref: 'User'},
});
let Conversation = mongoose.model('Conversation', conversationSchema);
export {Conversation} 