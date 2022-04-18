import Task from '../models/task';

function load(req, res, next, id) {
  Task.findById(id)
    .exec()
    .then((task) => {
      req.dbTask = task;
      return next();
    }, (e) => next(e));
}

function get(req, res) {
  return res.json(req.dbTask);
}

function create(req, res, next) {
  Task.create({
      user: req.body.user,
      description: req.body.description
    })
    .then((savedTask) => {
      return res.json(savedTask);
    }, (e) => next(e));
}

function update(req, res, next) {
  const task = req.dbTask;
  Object.assign(task, req.body);

  task.save()
    .then(() => res.sendStatus(204),
      (e) => next(e));
}

function list(req, res, next) {
  const { limit = 50, skip = 0 } = req.query;
  Task.find()
    .skip(skip)
    .limit(limit)
    .exec()
    .then((tasks) => res.json(tasks),
      (e) => next(e));
}

function remove(req, res, next) {
  const task = req.dbTask;
  task.remove()
    .then(() => res.sendStatus(204),
      (e) => next(e));
}

export default { load, get, create, update, list, remove };


import express from 'express';
import taskCtrl from '../controllers/tasks';

const router = express.Router();

router.route('/')
  /** GET /api/tasks - Get list of tasks */
  .get(taskCtrl.list)

  /** POST /api/tasks - Create new task */
  .post(taskCtrl.create);

router.route('/:taskId')
  /** GET /api/tasks/:taskId - Get task */
  .get(taskCtrl.get)

  /** PUT /api/tasks/:taskId - Update task */
  .put(taskCtrl.update)

  /** DELETE /api/tasks/:taskId - Delete task */
  .delete(taskCtrl.remove);

/** Load task when API with taskId route parameter is hit */
router.param('taskId', taskCtrl.load);

export default router;



GET /users: will return the list of users in our system
POST /users: will create a new user in our system
GET /users/[userId]: will return the user with the given userId
PUT /users/[userId]: will update the data for the user with the given userId
DELETE /users/[userId]: will delete the user with the given userId
