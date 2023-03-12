// const mongoose = require('mongoose');
// let count = 0;
//
// const options = {
//     autoIndex: false, // Don't build indexes
//     poolSize: 10, // Maintain up to 10 socket connections
//     // If not connected, return errors immediately rather than waiting for reconnect
//     bufferMaxEntries: 0,
//     // all other approaches are now deprecated by MongoDB:
//     useNewUrlParser: true,
//     useUnifiedTopology: true
//
// };
// const connectWithRetry = () => {
//     console.log('MongoDB connection with retry')
//     mongoose.connect("mongodb://localhost:27017/rest-tutorial", options).then(()=>{
//         console.log('MongoDB is connected')
//     }).catch(err=>{
//         console.log('MongoDB connection unsuccessful, retry after 5 seconds. ', ++count);
//         setTimeout(connectWithRetry, 5000)
//     })
// };
//
// connectWithRetry();
//
// exports.mongoose = mongoose;

// module.exports = {
//     //'MONGODB_CONNECTION': `mongodb://delicioapp-db-admin:DbAdmin2018@ds153380.mlab.com:53380/delicio-mvp`
//     'MONGODB_CONNECTION': `mongodb://octavie-db:abc030281@ds119750.mlab.com:19750/octavie-test`
//     //'MONGODB_CONNECTION':`mongodb://${process.env.DBAccount}:${process.env.DBPass}@${process.env.DBHost}:${process.env.DBPort}/${process.env.DBName}`
// };

// const mongoose=require('mongoose')
// mongoose.connect(
//   'mongodb+srv://user_db:welcome113@cluster0.vy1y6.mongodb.net/test?retryWrites=true',
//   {useNewUrlParser: true, useUnifiedTopology: true},
//   ()=>console.log('connect to db!')
// );
//
// exports.mongoose = mongoose;


const mongoose = require('mongoose');
const config="mongodb://mongodb/test" //= require('./config');

//mongoose.connect(config.mongodb.uri);
mongoose.connect(config)
mongoose.connection.on('error', (err) => {
    console.log("Erro: ", err);
});

mongoose.connection.on('connected', () => {
    console.log("Conectado ao MongoDB");
});

mongoose.connection.on('disconnected', () => {
    console.log("Conectado ao MongoDB");
});

process.on('SIGINT', () => {
    mongoose.connection.close(() => {
        console.log('Conexão Encerrada');
        process.exit(0);
    });
});

module.exports = mongoose;
