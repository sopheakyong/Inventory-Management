"use strict";
const Group=require('../models/group.model')
const BaseRespository=require('./../../repositories/base.repositories')
/* pass model to BaseRepository */
var Repository=new BaseRespository(Group);

// Repository.create1= async (data)=>
// {
//       Repository.setQueryExist({name: data.name})
//       const result=await Repository.insert(data)
//       return result
//
// }

module.exports=Repository;
