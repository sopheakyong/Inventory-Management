"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const router=require('express').Router()
const verifyToken=require('./verifyToken')
const auth=require('./../../commons/middlewares/auth')

/* GET users listing. */

function testcb(arg1, arg2, cb1){
  cb1(false, {data: 123})
}

// verifyToken ,
router.get('/',auth,function (req, res) {
  testcb(10,99, (err,data)=>{
  res.json({posts: {title:'my first pst', description: 'random data you should access', data: data}})

  })


})

module.exports = router;











/*
const UsersController = require('./controllers/users.controller');
const PermissionMiddleware = require('../common/middlewares/auth.permission.middleware');
const ValidationMiddleware = require('../common/middlewares/auth.validation.middleware');
const config = require('../common/config/env.config');

const ADMIN = config.permissionLevels.ADMIN;
const PAID = config.permissionLevels.PAID_USER;
const FREE = config.permissionLevels.NORMAL_USER;

exports.routesConfig = function (app) {
    app.post('/users', [
        UsersController.insert
    ]);
    app.get('/users', [
        ValidationMiddleware.validJWTNeeded,
        PermissionMiddleware.minimumPermissionLevelRequired(PAID),
        UsersController.list
    ]);
    app.get('/users/:userId', [
        ValidationMiddleware.validJWTNeeded,
        PermissionMiddleware.minimumPermissionLevelRequired(FREE),
        PermissionMiddleware.onlySameUserOrAdminCanDoThisAction,
        UsersController.getById
    ]);
    app.patch('/users/:userId', [
        ValidationMiddleware.validJWTNeeded,
        PermissionMiddleware.minimumPermissionLevelRequired(FREE),
        PermissionMiddleware.onlySameUserOrAdminCanDoThisAction,
        UsersController.patchById
    ]);
    app.delete('/users/:userId', [
        ValidationMiddleware.validJWTNeeded,
        PermissionMiddleware.minimumPermissionLevelRequired(ADMIN),
        UsersController.removeById
    ]);
};

*/
