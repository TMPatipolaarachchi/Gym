const mongoose = require('mongoose');

const machineSchema = new mongoose.Schema({
    mtitle:{
        type: String,
        required: true
    },
    mprice: {
        type: Number,
        required: true
    },
    mdescription: {
        type: String,
        required: true
    },
    mstatus: {
        type: String,
        required: true,
        enum: ['available', 'notavailable'],
        default: 'available'
    },
    userid:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'authuser',
        required: true
    }
})

module.exports = machine = mongoose.model('machine', machineSchema);