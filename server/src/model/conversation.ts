import * as mongoose from 'mongoose';

let Schema = mongoose.Schema;
let conversationSchema = new Schema({
    id: String,
    name: String,
    participants: [{type: Schema.Types.ObjectId , ref: 'User'}],
    messages: [{type: Schema.Types.ObjectId, ref: 'Message'}],
    type: String,
    lastMessage: {type: String, ref: 'Message'}
});
let Conversation = mongoose.model('Conversation', conversationSchema);
export {Conversation} 