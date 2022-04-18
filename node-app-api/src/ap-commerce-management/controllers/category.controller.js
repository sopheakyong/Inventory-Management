"use strict"
const Repository=require('./../repositories/branch.repositories')
const Controller=require('./../../base-controller/base.controller')
const queryExist="{name: data.name, _id: id}"
const queryCriteria=["name","id"]

Controller.setRepository(Repository,queryExist,queryCriteria) /* pass respository, query exist  to base controller */
module.exports=Controller
