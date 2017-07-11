import * as mongoose from 'mongoose';

let Schema = mongoose.Schema;
let messageSchema = new Schema({
    id: String,
    date: Number,
    from: String,
    content: String,
    type: String
});
let Message = mongoose.model('Message', messageSchema);
export {Message} 