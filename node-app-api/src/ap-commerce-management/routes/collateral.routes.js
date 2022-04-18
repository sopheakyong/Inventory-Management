"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const router=require('express').Router()

/* GET users listing. */
router.get('/', function (req, res) {
    res.send('Welcome  collaterial')
})

router.post('/', function (req, res) {
    console.log(req.headers['authorization']);
})

router.get('/:id', function (req, res) {
    res.send('get user by id')
})

router.delete('/:id', function (req, res) {

})
module.exports = router;
