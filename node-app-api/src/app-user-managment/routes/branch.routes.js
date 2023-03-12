"use strict"
const router=require('express').Router()
const Controller = require('../controllers/branch.controller')
const BaseRouter=require('../../routes/base.routes')
// const baseRouter=new BaseRouter(Controller)
 //const router=baseRouter.getRouter(

 class BranchRouter extends BaseRouter {
    constructor(Controller,router) {
       super(Controller,router)
    }
 }

 module.exports = new BranchRouter(Controller,router).router


//
// const auth=require('./../../commons/middlewares/auth')
// const router=require('express').Router()
// router.route('/')
//   /** GET /api/group - Get list of group */
//   .get(Controller.list)  //http://localhost:5000/api/v1/group?page=0&limit=2
//   /** POST /api/group - Create new group */
//   .post(Controller.create)
//   /** PUT /api/group/:groupId - Update group */
//   .put(Controller.update)
//
// router.route('/:id')
//   /** GET /api/group/:groupId - Get group */
//   .get(Controller.getById)
//   /** DELETE /api/group/:groupId - Delete group */
//   .delete(Controller.removeById)
// /** Load user when API with groupId route parameter is hit */
// router.param('id', Controller.getById)
// router.post('/exist',Controller.exist)
//
// module.exports = router;
