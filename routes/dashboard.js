//to call use http://localhost:3000/province
"use strict";
var express = require('express');
var router = express.Router();
//var db = require("../orientDBConfig.js");


var userRegisterModel= require("../models/userRegisterModel");


router.get('/registrationCount/:id', function(req, res, next) {
    console.log('registrationCount');
	userRegisterModel.registrationCount(req,res);
});

router.get('/registrationCountByChurch/:id', function(req, res, next) {
    console.log('registrationCountByChurch');
	userRegisterModel.registrationCountByChurch(req,res);
});

router.get('/countTshirt/:id', function(req, res, next) {
    console.log('registrationCountTshirt');
	userRegisterModel.countTshirst(req,res);
});

router.get('/countTransport/:id', function(req, res, next) {
    console.log('registrationCountTransport');
	userRegisterModel.countTransPort(req,res);
});


router.get('/transportList/:location', function(req, res, next) {
    console.log('transportList');
	userRegisterModel.transportList(req,res);
});





module.exports = router;