"use strict";
const router=require('express').Router()
const User=require('../models/users.model')
const jwt=require('jsonwebtoken')
const bcrypt=require('bcryptjs')

router.post('/register', async (req, res)=> {
  //Validate the data before use
  //Checking if the user already in the database
  const emailExist= await User.findOne({email: req.body.email})
  if(emailExist) return res.status(400).send('Email already exists')

  //Hash password
  const salt=await bcrypt.genSalt(10)
  const hashPassword=await bcrypt.hash(req.body.password,salt)
    const user= new User({
      name:req.body.name,
      email: req.body.email,
      password: hashPassword
    });
    try {
        const savedUser=await user.save();
        res.send(savedUser);
    } catch (e) {
      res.status(400).send(err);
    }

})

router.post('/login', async (req, res)=> {
    //validate the data before we a users
    /* check if the email exist */
    const user=await User.findOne({email: req.body.email})
    if(!user) return res.status(400).send('Email is not found')
    /* password is correct */
    const validPass=await bcrypt.compareSync(req.body.password,user.password)
    if(!validPass) return res.status(400).send('Invalid password')
    const payload={_id: user._id, email: user.email}
    const token=jwt.sign(payload,  process.env.JWT_SECRET,{expiresIn: process.env.JWT_EXPIRATION_IN_SECONDS})
    res.header('Authorization',token).send({auth: true, token: token})
    // send the access token to client inside a cookie
    // res.cookie("jwt", token, {secure: true, httpOnly: true})

})



router.post('/users', async (req, res) => {
    // Create a new user
    try {
        const user = new User(req.body)
        await user.save()
        const token = await user.generateAuthToken()
        res.status(201).send({ user, token })
    } catch (error) {
        res.status(400).send(error)
    }
})

router.post('/users/login', async(req, res) => {
    //Login a registered user
    try {
        const { email, password } = req.body
        const user = await User.findByCredentials(email, password)
        if (!user) {
            return res.status(401).send({error: 'Login failed! Check authentication credentials'})
        }
        const token = await user.generateAuthToken()
        //res.send({ user, token })
        res.header('Authorization',token).send({auth: true, token: token})

    } catch (error) {
        res.status(400).send({ error: error.message })
    }

})

// router.get('/users/me', auth, async(req, res) => {
//     // View logged in user profile
//     res.send(req.user)
// })
//
// router.post('/users/me/logout', auth, async (req, res) => {
//     // Log user out of the application
//     try {
//         req.user.tokens = req.user.tokens.filter((token) => {
//             return token.token != req.token
//         })
//         await req.user.save()
//         res.send()
//     } catch (error) {
//         res.status(500).send(error)
//     }
// })
//
// router.post('/users/me/logoutall', auth, async(req, res) => {
//     // Log user out of all devices
//     try {
//         req.user.tokens.splice(0, req.user.tokens.length)
//         await req.user.save()
//         res.send()
//     } catch (error) {
//         res.status(500).send(error)
//     }
// })

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
