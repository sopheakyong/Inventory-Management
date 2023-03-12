const mongoosePaginate = require('mongoose-paginate-v2');
const mongoose = require('../../commons/services/mongoose.service').mongoose;
const validator = require('validator')


const Schema = mongoose.Schema;
const groupSchema = new Schema({
  name: {
   type: String,
   required: true,
   trim: true,
   unique: true
   },
   addBy: Number,
   addDate: { type: Date, default: Date.now },
   updateBy: Number,
   updateDate: { type: Date},
   delBy: Number,
   delDate: { type: Date },

 })

 /* add plugin for pagination */
 groupSchema.plugin(mongoosePaginate);
 const Group = mongoose.model('Groups', groupSchema);
 module.exports = Group;

//
//  //Validate the User
//  user.validate(function(err){
//  if(err){
//  res.json(err);
//  return;
//  }else{
//  //Finally save the User
//  user.save(function(err){
//  if(err)
// {
//  res.json(err);
//  return;
//  }
//
//  //Remove Password before sending User details
//  user.password = undefined;
//  res.json(user);
//  return;
//  });
//  }
//  });
