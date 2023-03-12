//const dotenv = require('dotenv').config();
const dotenv = require('dotenv');
const path = require('path');
dotenv.config({
 path: path.resolve(__dirname,'./../../../'+ process.env.NODE_ENV + '.env')
});

// module.exports = {
//     "port": process.env.PORT || 5000,
//     "apiEndpoint": process.env.HOST || '127.0.0.1',
//     "jwt_secret": "myS33!!creeeT",
//     "jwt_expiration_in_seconds": 36000,
//     "environment": "dev",
//     "permissionLevels": {
//         "NORMAL_USER": 1,
//         "PAID_USER": 4,
//         "ADMIN": 2048
//     }
// };

module.exports = {
  NODE_ENV: process.env.NODE_ENV,
  HOST: process.env.HOST || '127.0.0.1',
  PORT: process.env.PORT,
  JWT_SECRET:  process.env.JWT_SECRET,

  server: {
          url: '',
          port: '3000'
      },
      mongodb: {
          uri: 'mongodb://mongodb/test',
          config: {}
      }

}


//mongodb+srv://user_db:<password>@cluster0.vy1y6.mongodb.net/test

//mongodb: user_db,welcome113
