import mongoose, { Document, model, ObjectId, Schema } from "mongoose";
export interface Ichat extends Document {
    isGroupChat:boolean,
    users:string[],
    latesMessages?:ObjectId,
    groupAdmin?:ObjectId,
    friend1?:string,
    friend2?:string
}
const chatSchema = new Schema({
    friend1:{
        type:String,
        required:false
    },
    friend2:{
        type:String,
        required:false
    },
    isGroupChat:{
        type:Boolean,
        required:false
    },
    users:[{
        type:mongoose.Schema.Types.ObjectId,
        ref: "User"
    }],
    latesMessages:{
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