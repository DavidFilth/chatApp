import * as mongoose from 'mongoose';

let Schema = mongoose.Schema;
let userSchema = new Schema({
    id: String,
    name: String,
    username: String,
    email: String,
    contacts: [ {type: Schema.Types.ObjectId, ref: 'User'}],
    conversations: [{type: Schema.Types.ObjectId, ref: 'Conversation'}],
    password: String,
    pendingRequests: [{type: Schema.Types.ObjectId, ref: 'User'}],
    lastConnection: Number
});
let User = mongoose.model('User', userSchema);
export {User} 
