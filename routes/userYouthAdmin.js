//to call use http://localhost:3000/province
"use strict";
var express = require('express');
var router = express.Router();
//var db = require("../orientDBConfig.js");

var userYouthAdminModel= require("../models/UserYouthAdminModel");


/* GET province listing. */
router.post('/find', function(req, res, next) {


	let adminuser = userYouthAdminModel.find(res,req);
	console.log('user logon', adminuser);

});


/* GET province listing. */
router.post('/resetpassword', function(req, res, next) {


	userYouthAdminModel.resetpassword(res,req);
	console.log('reset password logon');

});


module.exports = router;