'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const router=require('express').Router()

/* mount router into application */

router.use('/api/v1/customer', require('./customer.routes'));
router.use('/api/v1/loan', require('./loan.routes'));

router.use('/api/v1/note', require('./note.routes'));


module.exports = router;
