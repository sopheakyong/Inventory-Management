"use strict";
const User=require('../models/users.model')
const BaseRespository=require('./base.repositories')
/* pass model to BaseRepository */
BaseRespository.setModel(User)

BaseRespository.findByEmail=(email)=>{
  return User.find({email: email})
}
module.exports=BaseRespository;
