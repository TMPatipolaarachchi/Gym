const mongoose = require('mongoose');

const authuserSchema = new mongoose.Schema({
    uname:{
        type: String,
        required: true
    },
    uemail: {
        type: String,
        required: true,
        unique: true,
        index: true 
    },
    uaddress: {
        type: String,
        required: true
    },
    upassword: {
        type: String,
        required: true
    },
    urole: {
        type: String,
        required: true,
        enum: ['user', 'admin'],
        default: 'user'
    }
})

module.exports = authuser = mongoose.model('authuser', authuserSchema)