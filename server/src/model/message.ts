import * as mongoose from 'mongoose';

let Schema = mongoose.Schema;
let messageSchema = new Schema({
    date: Number,
    from: {type: Schema.Types.ObjectId, ref: 'User'},
    content: Schema.Types.Mixed,
    type: String,
    conversation: {type: Schema.Types.ObjectId, ref: 'Conversation'}
});
let Message = mongoose.model('Message', messageSchema);
export {Message} 