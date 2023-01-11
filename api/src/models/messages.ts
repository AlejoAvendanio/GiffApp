import mongoose, { Document, model, ObjectId, Schema, Types } from "mongoose";
export interface Imessage extends Document {
    name:string,
    isGroupChat:boolean,
    users:string[],
    latesMessahes:ObjectId,
    groupAdmin:ObjectId
}
const messageSchema = new Schema({
    sander:{
        type:Types.ObjectId,
        ref:"User"
    },
    content: {
        type:String,
        trim:true
    },
    chat:{
        type:Types.ObjectId,
        ref:"Chat"
    }
}
,
{
    timestamps:true,
})

const Message = model<Imessage>('Message', messageSchema);
module.exports = Message