"use strict";
const Branch=require('../models/branch.model')
const BaseRespository=require('./../../repositories/base.repositories')
/* pass model to BaseRepository */
var Repository=new BaseRespository(Branch);

module.exports=Repository;
