'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const router=require('express').Router() // to create modular, mountable route handlers

/* mount router into application  by specify path of the route*/

//router.use('/api/v1/auth', require('./auth.routes'));
router.use('/api/v1/user-management/user', require('./user.routes'));
router.use('/api/v1/user-management/group', require('./group.routes'));
router.use('/api/v1/user-management/branch', require('./branch.routes'));
router.use('/api/v1/user-management/permission', require('./permission.routes'));

router.use('/api/v1/post', require('./posts.routes'));
module.exports = router;
