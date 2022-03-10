const express = require('express')
const router = express.Router()
const path = require('path')
const multer  = require('multer')
const bcrypt = require('bcrypt');

const User = require('../models/user')
const Booking = require('../models/Booking')
const Room = require('../models/room')
const Contact = require('../models/contact')
const isUser = require('../middleware/isUser')
const isAdmin = require('../middleware/isadmin')


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/uploads/rooms')
    },
    filename: function (req, file, cb) {
      const fileName = `Aadhar_${req.session.user.username}.${file.mimetype.split('/')[1]}`
      cb(null, fileName)
    }
  })
// const upload = multer({ dest: 'public/uploads/rooms' })
  
const upload = multer({ storage: storage,    
    fileFilter: function (req, file, cb) {
    var ext = path.extname(file.originalname);
    if(ext !== '.png' && ext !== '.jpg' && ext !== '.gif' && ext !== '.jpeg') {
        return cb(new Error('Only images are allowed'))
    }
        cb(null, true)
    }})

router.get('/',(req,res) => {
    res.render('home')
})
router.get('/room1',(req,res) => {
    res.render('room1')
})
router.get('/About',(req,res) => {
    res.render('about')
})
router.get('/thanku',(req,res) => {
    res.render('thanku')
})
router.get('/rooms',isAdmin,(req,res) => {
    res.render('rooms',{userid:req.session.user._id,isadmin:req.session.user.isadmin})
})

router.post('/roomdetail',upload.single('fufile'),async(req,res) => {


    console.log(req.file);


    // const data = {
    //     UserId:req.session.user._id,
    //     Roomname:req.body.roomname,
    //     description:req.body.description,
    //     photopath:req.body.photopath,
    //     price:req.body.price,

    // }

    // const result = await Room(data).save()
    // console.log(result);
    // res.render('admin',{userid:req.session.user._id})

})


router.get('/Food',(req,res) => {
    res.render('food')
})
router.get('/Contact',(req,res) => {
    res.render('contact')
})
router.post('/sendnow',async(req,res) => {

    console.log("send");
    const data = {
        email:req.body.email,
        Msg:req.body.msg,
     
    }

    const result = await Contact(data).save()
    console.log(result);
    res.render('thanku');
})

router.get('/Admin',(req,res) => {
    res.render('admin')
})



router.post('/summary',async(req,res) => {
    // res.render('Booking')
    // console.log(req.body);
    const dat = {
        UserId:req.session.user._id,
        RoomType:req.body.roomtype,
        Checkindate:req.body.checkindate,
        CheckOutDate:req.body.checkoutdate,
        Facilities:req.body.facilities,
        NoofGuest:req.body.noofguest,
        username:req.body.username,
        moblie:req.body.mobile,
        address:req.body.address,
        Noofroom:req.body.noofroom,
        totalCost:0
    }

    var totalCost = 0

    if(req.body.roomtype == 'Delux') totalCost = totalCost + 2500 * req.body.noofroom
    else if(req.body.roomtype =='Non AC') totalCost = totalCost + 1000 * req.body.noofroom
    else  totalCost = totalCost + 2000 * req.body.noofroom
    
  for (var i=0;i<req.body.facilities.length;i++){
    if(req.body.facilities[i] == 'wi-fi') totalCost = totalCost + 500 * req.body.noofroom
    if(req.body.facilities[i] == 'parking') totalCost = totalCost + 700 * req.body.noofroom
    if(req.body.facilities[i] == 'game room') totalCost = totalCost + 1000 * req.body.noofroom
  }

  dat.totalCost = totalCost 
//   console.log(totalCost);
    // const resul= await Booking(dat).save()
    // console.log(resul);

     res.render('summary',{dat,userid:req.session.user._id,isadmin:req.session.user.isadmin})
})

router.post('/booknow/:data',async(req,res) => {

    var data = JSON.parse(req.params.data)
    // console.log(data);
    // res.render('booknow')
    const resul= await Booking(data).save()
    // console.log(resul);
    const result = await Booking.find()
    res.render('viewbooking',{result})
 })

router.get('/feedback',(req,res) => {
    res.render('feedback')
})
// router.get('/',(req,res) => {
//     res.render('feedback')
// })
router.get('/signup',(req,res) => { 
    res.render('signup')
})

router.post('/savedata',async (req,res) => {
    // console.log(req.body);
    const hashedPassword = bcrypt.hashSync(req.body.password, 12);
    const data = {
        email:req.body.email,
        username:req.body.name,
        password:hashedPassword,
        isadmin:false
    }

    const result = await User(data).save()
    console.log(result);
    if(result){
        return res.redirect('/login')
    }
    else{
        return res.redirect('/signup')
    }
})

router.post('/data',(req,res) => {
    res.send('Hello to post request')
})

router.get('/login',(req,res) => {
    res.render('login',{msg:''})
})

router.get('/logout',(req,res) => {
    req.session.destroy(() => {
        res.render('login',{msg:''})
    })
})

router.post('/checkUser',async (req,res) => {

    const result = await User.find({email:req.body.email})

    if(result.length > 0) {
        const isTrue = bcrypt.compareSync(req.body.password, result[0].password);
        if(isTrue) {
            req.session.user = result[0]
            req.session.save(() => {
                res.redirect('/booking')
            })
        }
        else {
            res.render('login',{msg:'Incorrect Password'})
        }
    }
    else {
        res.render('login',{msg:'User Not Registered'})
    }


    // if(result.length > 0) {
    //     res.redirect('/dashboard')
    // }
    // else {

    // }
})

router.get('/dashboard',(req,res) => {
    res.render('dashboard')
})
router.get('/booking',isUser,(req,res) => {
    console.log(req.session.user);
    res.render('booking',{userid:req.session.user._id,isadmin:req.session.user.isadmin})
})
router.get('/Admin/booking',isAdmin,(req,res) => {
    console.log(req.session.user.isadmin);
    res.render('booking',{userid:req.session.user._id,isadmin:req.session.user.isadmin})
})
router.get('/viewbooking/:id',isUser,async(req,res) => {

        const result = await Booking.find({UserId:req.params.id})
        console.log(result);
    
        res.render('viewbooking',{userid:req.session.user._id,result,isadmin:req.session.user.isadmin})
    })


router.get('/Admin/viewbooking',isAdmin,async(req,res) => {

        const result = await Booking.find()
        console.log(result);
    
        res.render('viewbooking',{result,userid:req.session.user._id,result,isadmin:req.session.user.isadmin})
    })
    // router.get('/cancel',(req,res) => { 
    //     res.render('dashboard')
    // })

    
router.get('/deletebooking/:id',async (req,res) => {
        // const id = '61e0f568c2ba50be0950d5c8'
        const id = req.params.id
        await Booking.findByIdAndDelete(id)
        // console.log(result);
        const result = await Booking.find()
        res.render('viewbooking',{result})

    
    })

module.exports = router
