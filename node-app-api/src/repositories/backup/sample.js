///<reference path="../../typings/modules/express/index.d.ts"/>
/*
    Drink Model
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//Import mongoose
const mongoose = require("mongoose");
let config = require('../configs/database'); // get our config file
//Connect to mongoose
let connection = mongoose.createConnection(config.MONGODB_CONNECTION);
const Schema = mongoose.Schema;
// Drink schema defition
const drinkSchema = new Schema({
    title: { type: String, required: true, trim: true },
    description: { type: String, trim: true },
    photos: [Schema.Types.Mixed],
    price: { type: Number, default: 0.0 },
    isActive: { type: Boolean, default: true },
    isAvailable: { type: Boolean, default: true },
    clicks: { type: Number, default: 0 },
    year: { type: Number, default: 0 },
    made: { type: String, default: null },
    type: { type: String, default: "Light" },
    createdOn: { type: Date, default: Date.now },
    createdBy: { type: Schema.Types.ObjectId, default: null },
    lastUpdatedOn: { type: Date, default: null },
    lastUpdatedBy: { type: Schema.Types.ObjectId, default: null },
    locales: [Schema.Types.Mixed]
});
/*
   the schema is useless so far
   we need to create a model using it
*/
const Drink = connection.model('Drink', drinkSchema);
// Export Drink object and methods
module.exports = Drink;
/*
    Method: insert
    Description: Insert a drink into the database
    Parameters:
        @newDrink -> is the drink object passed from service with well json format
        @callback -> is received function to return back data to a request
*/
module.exports.insert = function (newDrink, callback) {
    let query = {};
    if (newDrink.title && newDrink.title != "") {
        query = { "title": { $regex: new RegExp("^" + newDrink.title.toLowerCase(), "i") } };
        //Check if an eatery is already existed
        Drink.findOne(query, function (err, drink) {
            if (err) {
                callback({ "status": "GenericError", "detail": err });
            }
            else {
                //Invoke model to save data
                var drinkObject = new Drink(newDrink);
                if (drink == null) {
                    drinkObject.save(function (err, inserted) {
                        callback({ "status": "SuccessfulAdded", "detail": inserted });
                    });
                }
                else {
                    callback({ "status": "ItemIsExisted" });
                }
            }
        });
    }
    else {
        callback({ "status": "RequiredField" });
    }
};
/*
    Method: update
    Description: Update a drink.
    Parameters:
        @drinkId
        @updateObject
        @callback -> is received function to post back data to a request.
*/
module.exports.update = function (drinkId, updateObject, callback) {
    //Find and updated
    //Set last updated to updateObject
    updateObject.lastUpdatedOn = new Date();
    Drink.findOneAndUpdate({ _id: toObjectId(drinkId) }, { $set: updateObject }, { new: true }, function (err, updatedDrink) {
        if (err) {
            callback({ "status": "GenericError", "detail": err });
        }
        else {
            callback({ "status": "SuccessfulUpdated", "detail": updatedDrink });
        }
    });
};
/*
    Method: remove
    Description: Remove a drink.
    Parameters:
        @drinkId
        @callback -> is received function to post back data to a request.
*/
module.exports.remove = function (drinkId, callback) {
    let query = { _id: toObjectId(drinkId) };
    Drink.findByIdAndRemove(query, function (err, drink) {
        if (err) {
            callback({ "status": "GenericError", "detail": err });
        }
        else {
            callback({ "status": "SuccessfulDeleted" });
        }
    });
};
/*
    Method: getAll
    Description: Get all drinks.
    Parameters:
        @callback -> is received function to post back data to a request.
*/
module.exports.getAll = function (callback) {
    Drink.find({}, function (err, drinks) {
        if (err) {
            callback({ "status": "GenericError", "detail": err });
        }
        else {
            callback({ "status": "SuccessfullyRetrieved", "drinks": drinks });
        }
    });
};
/*
    Method: getById
    Description: Get a drink by id.
    Parameters:
        @drinkId
        @callback -> is received function to post back data to a request.

module.exports.getById = function(drinkId: string, callback: any) {
    Drink.findOne({_id: toObjectId(drinkId)}, function(err, drink) {
        if (err) {
            callback({"status": "GenericError", "detail": err});
        } else {
           callback({"status": "SuccessfullyRetrieved", "drink": drink});
        }
    });
}
*/
//private helper
function toObjectId(_id) {
    return mongoose.Types.ObjectId.createFromHexString(_id);
}
