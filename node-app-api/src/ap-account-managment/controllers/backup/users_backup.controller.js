"use strict";
const User=require('../models/users.model')
const Repository=require('./../repositories/user.repositories')
const jwt=require('jsonwebtoken')

exports.logIn= async (req,res)=>{
  //Login a registered user
  try {
    /* check if the email exist */
      const { email, password } = req.body
      const user = await User.findByCredentials(email, password)
      if (!user) {
          return res.status(401).send({error: 'Login failed! Check authentication credentials'})
      }
      /* password is correct */
      const token = await user.generateAuthToken()
      //res.send({ user, token })
      //res.header('Authorization',token).send({auth: true, token: token})
      res.header('Authorization',token).send({auth: true, user, token})
      // send the access token to client inside a cookie
      // res.cookie("jwt", token, {secure: true, httpOnly: true})

  } catch (error) {
      res.status(400).send({ error: error.message })
  }
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
exports.create = (req, res) => {

//  try {
      //const user = new User(req.body)
      // await user.save()
      //user=Repository.create(req.body)
    //  const token = await user.generateAuthToken()
      //res.status(201).send({ user, token })

      Repository.create(req.body, (data) => res.json(data));



//  } catch (error) {
  //      res.status(400).send({ error: error.message })
//  }
};
exports.update = (req, res) => {
    Repository.update(req.params.userId, req.body)
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




// exports.register= async (req,res)=>{
//   //Validate the data before use
//   //Checking if the user already in the database
//   const emailExist= await User.findOne({email: req.body.email})
//   if(emailExist) return res.status(400).send('Email already exists')
//
//   //Hash password
//   const salt=await bcrypt.genSalt(10)
//   const hashPassword=await bcrypt.hash(req.body.password,salt)
//     const user= new User({
//       name:req.body.name,
//       email: req.body.email,
//       password: hashPassword
//     });
//     try {
//         const savedUser=await user.save();
//         res.send(savedUser);
//     } catch (e) {
//       res.status(400).send(err);
//     }
// }
