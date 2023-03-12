'use strict';
const router=require('express').Router()
/* GET group listing. */
router.get('/', function (req, res) {
  res.send('List of permission')
})

router.post('/', function (req, res, next) {
    console.log(req.headers['authorization']);
})

router.get('/:id', function (req, res) {
  res.send('get permission by id')
})

router.delete('/:id', function (req, res) {

})
module.exports = router;
