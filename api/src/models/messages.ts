import { Document, model, ObjectId, Schema } from "mongoose";
export interface Imessage extends Document {
    content:string,
    sander:string,
    chat:ObjectId
}
const messageSchema = new Schema({
    sander:{
        type:Schema.Types.ObjectId,
        ref:"User"
    },
    content: {
        type:String,
        trim:true
    },
    chat:{
        type:Schema.Types.ObjectId,
        ref:"Chat"
    }
}
,
{
    timestamps:true,
})

const Message = model<Imessage>('Message', messageSchema);
module.exports = Message