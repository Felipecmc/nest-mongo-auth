/* eslint-disable prettier/prettier */
import * as mongoose from "mongoose";
import * as bcrypt from "bcrypt"

export const userSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    email: {
        type: String,
    },
    password: {
        type: String,
    }
})

userSchema.pre("save", async function(next) {
    try{
        if(!this.isModified("password")){
            return next()
        }

        this.password = await bcrypt.hash(this.password, 10)
    }catch(err){
        return next(err)
    }
})