"use strict"
const router=require('express').Router()
const Controller = require('./../controllers/category.controller')
const auth=require('./../../commons/middlewares/auth')

router.route('/')
  /** GET /api/groups - Get list of group */
  .get(Controller.list)
  /** POST /api/group - Create new group */
  .post(Controller.create)
  /** PUT /api/group/:groupId - Update group */
  .put(Controller.update)

router.route('/:id')
  /** GET /api/group/:groupId - Get group */
  .get(Controller.getById)
  /** DELETE /api/group/:groupId - Delete group */
  .delete(Controller.removeById)
/** Load user when API with groupId route parameter is hit */
router.param('id', Controller.getById)
router.post('/exist',Controller.exist)

module.exports = router;
