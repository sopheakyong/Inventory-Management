///<reference path="../../typings/modules/express/index.d.ts"/>
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const Validator = require("../helpers/validator");
//Import drink model
const Drink = require("../models/drink");
Drink;
//Create router and express app
const router = express.Router();
const app = express();
let validator = new Validator();
/*
    Get all drinks
    Required:
        None
*/
router.get('/', function (req, res, next) {
    Drink.getAll(function (data) {
        return res.json({ "status": validator.getResourceByKey(data.status), "drinks": data.drinks });
    });
}
/*
    Add an drink
    Required:
        @drink - drink object is required {"name": "VALUE"} or {"name": "VALUE", "type": "VALUE"}
*/
,
/*
    Add an drink    // const obj = new myModel(data);
    // obj.save(function(err,result){
    //         if (err){    // const obj = new myModel(data);
    // obj.save(function(err,result){
    //         if (err){
    //             console.log(err);
    //         }
    //         else
    //         {
    //             console.log(result)
    //             callback({ "status": "GenericError", "detail": obj });
    //         }
    // })





    //             console.log(err);
    //         }
    //         else
    //         {
    //             console.log(result)
    //             callback({ "status": "GenericError", "detail": obj });
    //         }
    // })





    Required:
        @drink - drink object is required {"name": "VALUE"} or {"name": "VALUE", "type": "VALUE"}
*/
router.post('/', function (req, res, next) {
    // object of the drink
    var jsonBody = req.body;
    Drink.insert(jsonBody, function (data) {
        return res.json({ "status": validator.getResourceByKey(data.status), "detail": data.detail });
    });
}
/*
    Update a drink
    Required:
        @drinkId - drink id is required
*/
,
/*
    Update a drink
    Required:
        @drinkId - drink id is required
*/
router.put('/', function (req, res, next) {
    // object of the drink
    var jsonBody = req.body;
    // invoke model method to update
    Drink.update(jsonBody._id, jsonBody, function (data) {
        return res.json({ "status": validator.getResourceByKey(data.status), "detail": data.detail });
    });
}
/*
    Delete a drink
    Required:
        @drinkId - drink id is required
*/
,
/*
    Delete a drink
    Required:
        @drinkId - drink id is required
*/
router.delete('/:id', function (req, res, next) {
    // object of the drink
    var jsonBody = req.body;
    Drink.remove(jsonBody.params.id, function (data) {
        return res.json({ "status": validator.getResourceByKey(data.status), "detail": data.detail });
    });
}, module.exports = router))));
