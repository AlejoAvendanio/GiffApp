import { Document, model, Schema } from "mongoose";
import bcrypt from "bcryptjs"
export interface Iuser extends Document {
    name:string,
    email:string,
    favorites?:string[],
    image?:string,
    password:string,
    encryptPassword(password:string):Promise<string>,
    validatePassword(password:string):Promise<boolean>
}
const userSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    favorites:[],
    password:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:false
    }
})

userSchema.methods.encryptPassword = async (password: string):Promise<string> =>{
    const salt = await bcrypt.genSalt(10)
    return bcrypt.hash(password, salt)
}

userSchema.methods.validatePassword =async function(password:string):Promise<boolean> {
    return await bcrypt.compare(password, this.password)
}


const User = model<Iuser>('Users', userSchema);
module.exports = User