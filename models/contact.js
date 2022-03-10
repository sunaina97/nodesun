const mongoose = require('mongoose')
const User = require('./user')
const contactSchema = mongoose.Schema({
    email: {
        type:String,
        required:true,
        trim:true
    },
  
   
    Msg:{
        type:String,
        required:true,
        trim:true
    },
  

})

module.exports = mongoose.model('contact',contactSchema)