import mongoose, { Document, model, ObjectId, Schema } from "mongoose";
export interface Ichat extends Document {
    name:string,
    isGroupChat:boolean,
    users:string[],
    latesMessahes:ObjectId,
    groupAdmin:ObjectId
}
const chatSchema = new Schema({
    chatName:{
        type:String,
        required:true
    },
    isGroupChat:{
        type:Boolean,
        required:false
    },
    users:[{
        type:mongoose.Schema.Types.ObjectId,
        ref: "User"
    }],
    latesMessahes:{
        type:mongoose.Schema.Types.ObjectId,
        ref: "Message"
    },
    groupAdmin:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }
}
,
{
    timestamps:true,
})

const Chat = model<Ichat>('Chat', chatSchema);
module.exports = Chat