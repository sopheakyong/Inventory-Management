
Object.defineProperty(exports, "__esModule", { value: true });  /* for moving app.js to src */
var express = require('express')
var app = express()
// var Router = require('router')
var route = express.Router()
// app.use(function (req, res, next) {
//     res.header('Access-Control-Allow-Origin', '*');
//     res.header('Access-Control-Allow-Credentials', 'true');
//     res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
//     res.header('Access-Control-Expose-Headers', 'Content-Length');
//     res.header('Access-Control-Allow-Headers', 'Accept, Authorization, Content-Type, X-Requested-With, Range');
//     if (req.method === 'OPTIONS') {
//         return res.sendStatus(200);
//     } else {
//         return next();
//     }
// });

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


// var mongoose=require('mongoose')
// mongoose.connect('mongodb://mongodb:27017/test', {useNewUrlParser: true})
// var db=mongoose.connection
// db.on('error'.console.error.bind(console,'CONNECTION ERROR'))
// db.onece('open',()=>{console.log('Connected')})



 // var users=require('./ap_account-managment/routes')
 // app.use(users);
 // var user_route=require('./routes')
 // app.use(user_route)

 app.listen(5000, () => { console.log('API running at: http://localhost:5000');});
