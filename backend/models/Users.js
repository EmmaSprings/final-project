import mongoose from "mongoose"
import crypto from "crypto"

const signUpTemplate = new mongoose.Schema({
    email:{
        type: String,
        unique: true,
        required: true
    },
    username:{
        type: String,
        unique: true,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    accessToken:{
        type: String,
        default: () => crypto.randomBytes(128).toString('hex')
    },
    date:{
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('User', signUpTemplate)

