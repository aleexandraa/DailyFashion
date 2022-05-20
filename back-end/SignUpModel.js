const mongoose = require('mongoose')
const { ObjectId } = mongoose.Schema.Types

const signUpTemplate = new mongoose.Schema({
    fullName: {
        type: String,
        require: true,
    },
    userName: {
        type: String,
        require: true,
    },
    email: {
        type: String,
        require: true,
    },
    password: {
        type: String,
        require: true,
    },
    date: {
        type: Date,
        default: Date.now
    },
    followers: { type: Array },
    following: { type: Array },
    pictures: {
        type: Array
    },
    userPic: { type: Array },
})

module.exports = mongoose.model('users', signUpTemplate)