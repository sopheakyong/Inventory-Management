var restful = require('node-restful');
var mongoose = restful.mongoose;

//Schemas
var paymentSchema = new mongoose.Schema({
    cardnumber: Number,
    cardtype: String
    // code: Number,
    // expiredate: Date,
    // nameoncard: String,
    // address: String,
    // state: String,
    // zip: Number
});

var userSchema = new mongoose.Schema({
    username: { type: String, required: true, index:{unique: true} },
    fn: String,
    email: String,
    ln: String,
    fullname: String,
    pw: { type: String, required: true}, // pwd hash
    //slt: String, //salt
    pnum: Number, //phone number
    usrtype: String,
    paymentinfo: [paymentSchema]

});

//Return models
module.exports = restful.model('PaymentInfo', paymentSchema);
module.exports = restful.model('User', userSchema);








I figured it out! I was not getting the values in the array that was being posted.

removing this part:

 var payment = new PaymentInfo(
                      { cardtype: req.body.paymentinfo.cardtype,
                        cardnumber: req.body.paymentinfo.cardnumber
                      });

                     user.paymentinfo.push(payment)
And replacing it with this:

req.body.paymentinfo.forEach(function(card) {
                        user.paymentinfo.push(card);
});
Also no need to export out PaymentSchema model

module.exports = restful.model('PaymentInfo', paymentSchema);
