import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    email:{
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    password:{
        type: String,
        required: true
    },
    firstName:{
        type: String,
        required: true
    },
    lastName: {
        type: String
    },
    bestFriendName:{
        type: String,
        required: true
    },
});

const User = mongoose.model('User', userSchema);
module.exports = {
    User
};