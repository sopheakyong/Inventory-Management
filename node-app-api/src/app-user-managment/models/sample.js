var UserSchema = new Schema({
  name : String,
  group: { type: Schema.Types.ObjectId, ref: 'Group' }
});

var GroupSchema = new Schema({
  name  : String,
  users : [ { type: Schema.Types.ObjectId, ref: 'User' } ]
});


module.exports = mongoose.model('User', UserSchema);
module.exports = mongoose.model('Group', GroupSchema);
