'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const router=require('express').Router()

/* mount router into application */

//router.use('/api/v1/auth', require('./auth.routes'));
router.use('/api/v1/user', require('./user.routes'));
router.use('/api/v1/group', require('./group.routes'));
router.use('/api/v1/branch', require('./branch.routes'));
router.use('/api/v1/permission', require('./permission.routes'));

router.use('/api/v1/post', require('./posts.routes'));
module.exports = router;
