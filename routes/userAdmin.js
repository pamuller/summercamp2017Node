//to call use http://localhost:3000/province
"use strict";
var express = require('express');
var router = express.Router();
//var db = require("../orientDBConfig.js");

var userAdminModel= require("../models/UserAdminModel");


/* GET province listing. */
router.post('/findAdmin', function(req, res, next) {


	let adminuser = userAdminModel.find(res,req);
	//console.log('user logon', adminuser);

});


module.exports = router;