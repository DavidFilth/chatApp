import * as mongoose from 'mongoose';

let Schema = mongoose.Schema;
let userSchema = new Schema({
    name: String,
    username: String,
    email: String,
    password: String,
    contacts: [ {type: Schema.Types.ObjectId, ref: 'User'}],
    conversations: [
        {
            _id: false,
            info: {type: Schema.Types.ObjectId, ref: 'Conversation'},
            unreadMessages: {type: Number, default: 0}
        }
    ],
    pendingRequests: [{type: Schema.Types.ObjectId, ref: 'User'}],
    language: String
});
let User = mongoose.model('User', userSchema);
export {User} 
