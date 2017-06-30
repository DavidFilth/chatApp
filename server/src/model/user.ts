import * as mongoose from 'mongoose';

let Schema = mongoose.Schema;
let userSchema = new Schema({
    id: String,
    name: String,
    lastName: String,
    userName: String,
    email: String,
    password: String
});
let User = mongoose.model('User', userSchema);
export {User} 
