'use strict';
const router=require('express').Router()
/* GET group listing. */
router.get('/', function (req, res) {
  res.send('Welcome customer')
})

router.post('/', function (req, res, next) {
    console.log(req.headers['authorization']);
})

router.get('/:id', function (req, res) {
  res.send('get group by id')
})

router.delete('/:id', function (req, res) {

})
module.exports = router;

// module.exports = (app) => {
//     const notes = require('../controllers/note.controller.js');
//
//     // Create a new Note
//     app.post('/notes', notes.create);
//
//     // Retrieve all Notes
//     app.get('/notes', notes.findAll);
//
//     // Retrieve a single Note with noteId
//     app.get('/notes/:noteId', notes.findOne);
//
//     // Update a Note with noteId
//     app.put('/notes/:noteId', notes.update);
//
//     // Delete a Note with noteId
//     app.delete('/notes/:noteId', notes.delete);
// }

//require('./app/routes/note.routes.js')(app);
