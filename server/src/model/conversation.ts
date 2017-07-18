import * as mongoose from 'mongoose';

let Schema = mongoose.Schema;
let conversationSchema = new Schema({
    id: String,
    name: String,
    participants: Array,
    messages: Array,
    type: String
});
let Conversation = mongoose.model('Conversation', conversationSchema);
export {Conversation} 