const mongoosePaginate = require('mongoose-paginate-v2');
const mongoose = require('../../commons/services/mongoose.service').mongoose;
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const Schema = mongoose.Schema;
const userSchema = new Schema({
   name: {
    type: String,
    required: true,
    trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        validate: value => {
            if (!validator.isEmail(value)) {
                throw new Error({error: 'Invalid Email address'})
            }
        }
    },
    password: {
        type: String,
        required: true,
        minLength: 7
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
    // token: {
    //     type: String,
    //     required: true
    // },
    // date: {
    //   type: Date,
    //   default: Date.now
    // }

 })
 /* add plugin for pagination */
 userSchema.plugin(mongoosePaginate);

 userSchema.pre('save', async function (next) {
     // Hash the password before saving the user model
     const user = this
     if (user.isModified('password')) {
         user.password = await bcrypt.hash(user.password, 8)
     }
     next()
 })

 userSchema.methods.generateAuthToken = async function() {
     // Generate an auth token for the user
     const user = this
     const payload={_id: user._id, email: user.email}
     const token=jwt.sign(payload,  process.env.JWT_SECRET,{expiresIn: process.env.JWT_EXPIRATION_IN_SECONDS})
     user.tokens = user.tokens.concat({token})
     //user.token = token
     await user.save()
     return token
 }

 userSchema.statics.findByCredentials = async (email, password) => {
     // Search for a user by email and password.
     const user = await User.findOne({email} )
     if (!user) {
         return null;
     }
     const isPasswordMatch = await bcrypt.compare(password, user.password)
     if (!isPasswordMatch) {
       const a=await bcrypt.hash(password, 8)
       return null;
     }
     return user
 };

 userSchema.methods.exist = async (email) => {

     const user = await User.findOne({email} )
     if (!user) {
         return false;
     }
     return user;
   };

 userSchema.virtual('id').get(function () {
     return this._id.toHexString();
 });

 // Ensure virtual fields are serialised.
 userSchema.set('toJSON', {
     virtuals: true
 });

 userSchema.findById = function (cb) {
     return this.model('Users').find({id: this.id}, cb);
 };


 const User = mongoose.model('Users', userSchema);

 module.exports = User;


 // name: {
 //      type:String,
 //      required: true,
 //      min: 6,
 //      max: 255
 // },
 // email: {
 //      type:String,
 //      required: true,
 //      max: 255,
 //      min: 6
 // },
 // password: {
 //      type: String,
 //      required: true,
 //      min: 6,
 //      max: 1024
 // },
 // date: {
 //   type: Date,
 //   default: Date.now
 // }
