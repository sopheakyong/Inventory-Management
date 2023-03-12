const mongoosePaginate = require('mongoose-paginate-v2');
const mongoose = require('../../commons/services/mongoose.service').mongoose;
const validator = require('validator')


const Schema = mongoose.Schema;
const branchSchema = new Schema({
  name: {
       type: String,
       required: true,
       trim: true,
       unique: true
   },
  photos: [Schema.Types.Mixed],
  description: { type: String, trim: true },
  address: {province: Number, district: Number, commune: Number, village: Number,location: String, locationKh: String},


  isActive: { type: Boolean, default: true },
  createdOn: { type: Date, default: Date.now },
  createdBy: { type: Schema.Types.ObjectId, default: null },
  lastUpdatedOn: { type: Date, default: null },
  lastUpdatedBy: { type: Schema.Types.ObjectId, default: null },
  deletedOn: { type: Date, default: null },
  deletedBy: { type: Schema.Types.ObjectId, default: null },
  locales: [Schema.Types.Mixed]

 })
 /* add plugin for pagination */
 branchSchema.plugin(mongoosePaginate);
 const Branch = mongoose.model('Branches', branchSchema);
 module.exports = Branch;
