"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jwt=require('jsonwebtoken')
const User = require('./../../app-user-managment/models/users.model')
// FORMAT OF Token
// Authorization: Bearer <access_token>
module.exports= async function(req,res,next){
  const bearerHeader=req.header('Authorization') //.replace('Bearer ', '')
  if(!bearerHeader || bearerHeader.includes('Bearer')==false)
      return res.status(401).send({auth: false, message: 'Acess Denied'});
  else {
    const bearer=bearerHeader.split(' ')
    const bearerToken=bearer[1]
    req.token=bearerToken
  }
  try{
      const verified=jwt.verify(req.token,process.env.JWT_SECRET)
      //const user = await User.findOne({ _id: verified._id, 'token': req.token })
        const user = await User.findOne({ _id: verified._id, 'tokens.token': req.token })
      if (!user) {
          throw new Error()
      }
      req.user = user
      console.log(verified)
      next()
  }catch(err){
      res.status(400).send({auth: false, message: 'Not authorized to access this resource'});
  }

}




// const auth = async(req, res, next) => {
//     const token = req.header('Authorization').replace('Bearer ', '')
//
//     try {
//         const data = jwt.verify(token, process.env.JWT_KEY)
//         const user = await User.findOne({ _id: data._id, 'tokens.token': token })
//
//         if (!user) {
//             throw new Error()
//         }
//
//         req.user = user
//         req.token = token
//         next()
//     } catch (error) {
//         res.status(401).send({ error: 'Not authorized to access this resource' })
//     }
// }
//module.exports = auth
