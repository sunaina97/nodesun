const mongoose = require('mongoose')
const User = require('./user')

const roomSchema = mongoose.Schema({


    UserId : {
        type:mongoose.Schema.Types.ObjectId,
        ref:User,
        required:true
    },

    Roomname: {
        type:String,
        required:true,
        trim:true
    },
  
    description:{
        type:String,
        required:true,
        trim:true
    },
  
    photopath:{
        type:String,
        trim:true
    },
    price:{
        type:String,
        required:true,
        trim:true
    }







})
    module.exports = mongoose.model('Room',roomSchema)
