const mongoose = require('mongoose')
const User = require('./user')

const BookingSchema = mongoose.Schema({
    UserId : {
        type:mongoose.Schema.Types.ObjectId,
        ref:User,
        required:true
    },
    RoomType: {
        type:String,
        required:true,
        trim:true
    },
  
    Checkindate:{
        type:String,
        required:true,
        trim:true
    },
    CheckOutDate:{
        type:String,
        required:true,
        trim:true
    },
    Facilities:{
        type:Array,
        required:true,
        trim:true
    },
    NoofGuest:{
        type:String,
        required:true,
        trim:true
    },
    username:{
        type:String,
        required:true,
        trim:true
    },
    moblie:{
        type:String,
        required:true,
        trim:true
    },
    address:{
        type:String,
        required:true,
        trim:true
    }, 
    Noofroom:{
        type:Number,
        required:true,
        trim:true
    }, 
    totalCost:{
        type:Number,
        required:true,
        trim:true
    }, 

})

module.exports = mongoose.model('Booking',BookingSchema)