"use strict"
const Repository=require('./../repositories/branch.repositories')
const BaseController=require('./../../base-controller/base.controller')
const queryExist="{name: data.name, _id: id}"
const queryCriteria=["name","id"]
/**
 * The Base controller class where other controller inherits or
 * overrides pre defined and existing properties
 */
// class BranchController extends BaseController {
//    /**
//     *
//     * for the controller. Will be required to create
//     * an instance of the controller
//     */
//    constructor() {
//       super(Repository,queryExist,queryCriteria);
//    }
// }
module.exports=  new BaseController(Repository,queryExist,queryCriteria)
