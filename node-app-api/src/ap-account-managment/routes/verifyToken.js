"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jwt=require('jsonwebtoken')

// FORMAT OF Token
// Authorization: Bearer <access_token>
module.exports=function(req,res,next){
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
      req.user=verified
      console.log(verified)
      next()
  }catch(err){
      res.status(400).send({auth: false, message: 'Acess Denied'});
  }

}

//
//
// const jwt = require('jsonwebtoken');
// const AUTH_UTILS = require('../utils/auth.util');
// const DATABASE = require('../db');
//
// const authMiddleWare = async (req, res, next) => {
//     try {
//         const authorization = req.header('Authorization');
//         if (!authorization) {
//             return res.status(401).send({
//                 message: 'Not authorized to do this action'
//             });
//         }
//
//         const token = authorization.replace('Bearer ', '');
//         const data = jwt.verify(token, AUTH_UTILS.JWT_KEY);
//
//         const user = await DATABASE('tokens').where({ user_id: data.id });
//         if (!user) {
//             return res.status(401).send({
//                 message: 'Not authorized to do this action'
//             });
//         }
//
//         req.userId = data.id;
//         req.username = data.username;
//         req.isAdmin = data.isAdmin;
//
//         next();
//     } catch (error) {
//         return res.status(500).json({ message: `${JSON.stringify(error)}` });
//     }
// }
// module.exports = authMiddleWare;


// const logout = async (req, res, next) => {
//     try {
//         await DATABASE('tokens').where('user_id', req.userId).del();
//         return res.status(200).json({});
//     } catch (error) {
//         return res.status(500).json({ message: `${JSON.stringify(error)}` });
//     }
// }
// view raw
