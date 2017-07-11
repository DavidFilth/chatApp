import * as mongoose from 'mongoose';

let Schema = mongoose.Schema;
let userSchema = new Schema({
    id: String,
    name: String,
    username: String,
    email: String,
    contacts: Array,
    conversations: Array,
    password: String,
    pendingRequests: Array
});
let User = mongoose.model('User', userSchema);
export {User} 
