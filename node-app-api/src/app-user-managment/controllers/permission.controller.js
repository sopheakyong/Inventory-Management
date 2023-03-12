"use strict";

const Repository=require('./../repositories/permission.repositories')

exports.create = async (req, res) => {
  try {
      group=Repository.create(req.body)
      res.status(200).send(group);

  } catch (error) {
        res.status(400).send({ error: error.message })
  }
};
exports.update = (req, res) => {
    Repository.update(req.params.id, req.body)
        .then((result) => {
            res.status(204).send({result});
        })

};
exports.list = (req, res) => {
    let limit = req.query.limit && req.query.limit <= 100 ? parseInt(req.query.limit) : 10;
    let page = 0;
    if (req.query) {
        if (req.query.page) {
            req.query.page = parseInt(req.query.page);
            page = Number.isInteger(req.query.page) ? req.query.page : 0;
        }
    }
    Repository.list(limit, page)
        .then((result) => {
            res.status(200).send(result);
        })
};

exports.getById = (req, res) => {
    Repository.findById(req.params.id)
        .then((result) => {
            res.status(200).send(result);
        })
};
exports.removeById = (req, res) => {
    Repository.removeById(req.params.id)
        .then((result)=>{
            res.status(204).send({});
        })
};
