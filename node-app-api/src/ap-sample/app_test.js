const express= require('express')
const app=express()
app.get('/',(req,res)=>{
  res.send("Hello world")
})

app.get('/user/:id', function (req, res, next) {
  // if the user ID is 0, skip to the next route
  if (req.params.id === '0') next('route')
  // otherwise pass the control to the next middleware function in this stack
  else next()
}, function (req, res, next) {
  // send a regular response
  res.send('regular')
})

// handler for the /user/:id path, which sends a special response
app.get('/user/:id', function (req, res, next) {
  res.send('special')
})

 app.listen(5000, () => { console.log('API running at: http://localhost:5000');});


// #############################################################

 const express = require('express');
 const bodyParser = require('body-parser');

 // create express app
 const app = express();

 // parse requests of content-type - application/x-www-form-urlencoded
 app.use(bodyParser.urlencoded({ extended: true }))

 // parse requests of content-type - application/json
 app.use(bodyParser.json())

 // define a simple route
 app.get('/', (req, res) => {
     res.json({"message": "Welcome to EasyNotes application. Take notes quickly. Organize and keep track of all your notes."});
 });

 // listen for requests
 app.listen(3000, () => {
     console.log("Server is listening on port 3000");
 });



/*************************************************************/



Object.defineProperty(exports, "__esModule", { value: true });  /* for moving app.js to src */
var express = require('express')
var app = express()
// var Router = require('router')
var route = express.Router()
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
    res.header('Access-Control-Expose-Headers', 'Content-Length');
    res.header('Access-Control-Allow-Headers', 'Accept, Authorization, Content-Type, X-Requested-With, Range');
    if (req.method === 'OPTIONS') {
        return res.sendStatus(200);
    } else {
        return next();
    }
});

app.route('/book')
  .get(function (req, res) {
    res.send('Get a random book')
  })
  .post(function (req, res) {
    res.send('Add a book')
  })
  .put(function (req, res) {
    res.send('Update the book')
  })


var birds = require('./birds')
app.use('/birds', birds)  // mount the router on the app


var mongoose=require('mongoose')
mongoose.connect('mongodb://mongodb:27017/test', {useNewUrlParser: true})
// var db=mongoose.connection
// db.on('error'.console.error.bind(console,'CONNECTION ERROR'))
// db.onece('open',()=>{console.log('Connected')})



 // var users=require('./ap_account-managment/routes')
 // app.use(users);
 var user_route=require('./routes')
 app.use(user_route)

 app.listen(5000, () => { console.log('API running at: http://localhost:5000');});
