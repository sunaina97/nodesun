const mongoose = require('mongoose')
const User = require('./user')

const userSchema = mongoose.Schema({
    email: {
        type:String,
        required:true,
        trim:true
    },
   
    username:{
        type:String,
        required:true,
        trim:true
    },
    password:{
        type:String,
        required:true,
        trim:true
    },
    isadmin:{
        type:Boolean,
    }

})

module.exports = mongoose.model('User',userSchema)