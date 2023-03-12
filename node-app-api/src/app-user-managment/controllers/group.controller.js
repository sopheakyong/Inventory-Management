"use strict"
const Repository=require('./../repositories/group.repositories')
const BaseController=require('./../../base-controller/base.controller')
const queryExist="{name: data.name, _id: id}"
const queryCriteria=["name","id"]

/**
 * The Base controller class where other controller inherits or
 * overrides pre defined and existing properties
 */
class GroupController extends BaseController {
   /**
    *
    * for the controller. Will be required to create
    * an instance of the controller
    */
   constructor() {
      super(Repository,queryExist,queryCriteria)
   }

   showGroup(req,res){
       res.status(400).send({ name: "group" })
   }

}

module.exports=  new GroupController()

// const BranchController=require('./../../base-controller/base.controller')
// const queryExist="{name: data.name, _id: id}"
// const queryCriteria=["name","id"]
//
// BranchController.setRepository(Repository,queryExist,queryCriteria) /* pass respository, query exist  to base controller */
// module.exports=BranchController

/* sample */
// GroupController.test=  (req, res) =>{
//     res.status(200).send({ message: 'Hello test' })
// }
//  const queryWithId= "{ $ne: ObjectID(id)}"
