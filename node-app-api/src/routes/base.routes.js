"use strict"
/* don't define router here because it will be used the same route for all controller */
//const router=require('express').Router()
const auth=require('./../commons/middlewares/auth')
class BaseRoute {
  constructor(Controller,router) {
         this.router =  router
         //const copied = Object.create(original)
         this.router.route('/')
           /** GET /api/groups - Get list of group */
           .get(Controller.list)
           /** POST /api/group - Create new group */
           .post(Controller.create)
           /** PUT /api/group/:groupId - Update group */
           .put(Controller.update)

         this.router.route('/:id')
           /** GET /api/group/:groupId - Get group */
           .get(Controller.getById)
           /** DELETE /api/group/:groupId - Delete group */
           .delete(Controller.removeById)
         /** Load user when API with groupId route parameter is hit */
         this.router.param('id', Controller.getById)
         this.router.post('/exist',Controller.exist)
      }

}

module.exports = BaseRoute
