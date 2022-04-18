"use strict";
const User=require('../models/users.model')
const Repository=require('./../repositories/user.repositories')
const jwt=require('jsonwebtoken')

exports.logIn= async (req,res)=>
{
   const result=await Repository.login(req.body);
   res.status(200).send(result);
}

/* Log user out of the application */
exports.logOut=async (req, res) => {

    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token != req.token
        })
        await req.user.save()
        res.send()
    } catch (error) {
        res.status(500).send(error)
    }
  }

/* Log user out of all devices */
exports.logOutAll=async (req, res)=>{
  try {
      req.user.tokens.splice(0, req.user.tokens.length)
      await req.user.save()
      res.send()
  } catch (error) {
      res.status(500).send(error)
  }
};

/* Create a new user */
exports.create = async (req, res) => {
      // /* this method call normal regiter */
      // Repository.register(req.body, (data) =>{
      //    res.status(200).send(data);
      // });
        //
      //  Repository.setModelUser();
        const data=await Repository.registerAsync(req.body);
        res.status(200).send(data);


};
exports.update = async(req, res) => {
    // Repository.update(req.body.id, req.body,(result)=>{
    //   res.status(200).send(result);
    // })
    const result=await Repository.updateAsync(req.body.id, req.body);
    res.status(200).send(result);
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
    //Repository.setModelUser();
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
exports.remove = async(req, res) => {
    const result=await Repository.removeAsync(req.body.id);
    res.status(200).send(result);
};
