"use strict";
const router=require('express').Router()
const User=require('../models/users.model')
const jwt=require('jsonwebtoken')
const bcrypt=require('bcryptjs')
const UsersController = require('./../controllers/users.controller');
const auth=require('./../../commons/middlewares/auth')

 router.post('/register',UsersController.create)
 router.post('/login',UsersController.logIn)
 router.get('/me', auth, async(req, res) => {res.send(req.user)}) //View logged in user profile
 router.post('/me/logout', auth,UsersController.logOut)
 router.post('/me/logOutAll', auth, UsersController.logOutAll)
 router.get('/list',UsersController.list)
 router.post('/update',UsersController.update)
 router.post('/remove',UsersController.remove)
// router.get('/:userId', auth,UsersController.getById)
// router.patch('/:userId', auth,UsersController.patchById)
// router.delete('/:userId',auth, UsersController.removeById)

module.exports = router;

























// const generateAuthToken = function (user) {
//     const token = jwt.sign({
//         id: user.id,
//         username: user.username,
//         isAdmin: user.role == 'admin'
//     }, AUTH_UTILS.JWT_KEY);
//     return token;
// }


//
// const login = async (req, res, next) => {
//     try {
//         const { username, password } = await req.body;
//         const user = await DATABASE('users').where({ username });
//
//         if (!user || (user && user.length == 0)) {
//             return res.status(404).json({ message: "Your account is not corrected!" });
//         }
//
//         const isPasswordMatch = await bcrypt.compare(password, user[0].password);
//
//         if (!isPasswordMatch) {
//             return res.status(404).json({ message: "Your password is not corrected!" })
//         }
//
//         const token = generateAuthToken(user[0]);
//         const checkUser = await DATABASE('tokens').where({ user_id: user[0].id });
//
//         if(checkUser && checkUser.length > 0) {
//             await DATABASE('tokens').where({ user_id: user[0].id }).update({ token });
//         } else {
//             await DATABASE('tokens').insert({ user_id: user[0].id, token });
//         }
//
//         const data = {
//             first_name: user[0].first_name,
//             last_name: user[0].last_name,
//             username: user[0].username,
//             email: user[0].email,
//             avatar: user[0].avatar_url,
//             bio: user[0].bio,
//             role: user[0].role,
//             token
//         }
//         return res.status(200).json(data);
//     } catch (error) {
//         return res.status(500).json({ message: `${JSON.stringify(error)}` });
//     }
// }
