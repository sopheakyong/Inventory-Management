"use strict"
const router=require('express').Router() /* need to declare here not in base route */
const Controller = require('./../controllers/group.controller')
const BaseRouter=require('./../../routes/base.routes')


router.get('/show_group',Controller.showGroup)
var baseRouter=new BaseRouter(Controller,router)

module.exports = router


// const Controller = require('./../controllers/group.controller')
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


//

// router.get('/list',Controller.list)
// router.post('/create',Controller.create)
//  .get(auth,Controller.list)
/*
Testing the Endpoints
All set, let’s grab a console and try our set of endpoints. Let’s start by creating a new user with our POST /users endpoint:
# POST /users
$ curl -X POST http://localhost:3000/api/users \
    -d username=test_user \
    -d password=hello_world



    # DELETE /users/:userId
    $ curl -X DELETE http://localhost:3000/api/users/579949227038c8e0b2e399a7




*/
