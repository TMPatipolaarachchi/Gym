const mongoose = require('mongoose');

const suplementSchema = new mongoose.Schema({
    stitle:{
        type: String,
        required: true
    },
    sprice:{
        type: Number,
        required: true
    },
    sdescription:{
        type: String,
        required: true 
    },
    sstatus:{
        type: String,
        required: true ,
        enum: ['available', 'notavailable'],
        default: 'available'
    },
    userid:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'authuser',
        required: true
    }
})

module.exports = suplement = mongoose.model('suplement', suplementSchema);