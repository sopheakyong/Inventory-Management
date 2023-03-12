Object.defineProperty(exports, "__esModule", { value: true });  /* for moving app.js to src */
const config = require('./commons/configs/env.config.js');
const express = require('express')
const app_route=require('./routes')
const bodyParser = require('body-parser');
const crypto = require('crypto');

const app = express()
const route = express.Router()


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

//app.use(express.json())

// parse requests of content-type - application/json
app.use(bodyParser.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));


console.log(`MY NODE_ENV1=${config.NODE_ENV}`);
console.log('My ENV, ' + process.env.PORT)

app_route.routesConfig(app)
app.listen(config.PORT, () => { console.log('API running at: ' + 'abc');});

