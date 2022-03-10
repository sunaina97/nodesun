const express = require("express");
const app= express()
const mongoose = require('mongoose');
const session = require('express-session')
const MongoDBStore = require('connect-mongodb-session')(session);
const routes = require('./routes/route')

require('dotenv').config()
var store = new MongoDBStore({
    uri: process.env.MONGO_LIVE,
    collection: 'sessions'
  });


app.use(express.urlencoded({extended:false}))
app.use(express.static('public'))
app.use(require('express-session')({
    secret: 'nkudsdfgiofc',
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7 // 1 week
    },
    store: store,
    resave: true,
    saveUninitialized: true
  }));

app.set('view engine','ejs')
app.set('views','views')


app.use('/',routes)

app.get('*',(req,res) =>{
    res.render('404');
})


mongoose
    .connect(process.env.MONGO_LIVE)
    .then(() => {
        console.log("Database Connected");
        app.listen(process.env.PORT,() => {
            console.log(`Server Running on ${process.env.PORT}`);
        })
    })
    .catch(() => {
        console.log("ERROR!!!!!");
    })