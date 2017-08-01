//to call use http://localhost:3000/company

var express = require('express');
var router = express.Router();
//var db = require("../orientDBConfig.js");

var user= require("../models/UserLogonModel");


/* GET users listing. */




router.get('/', function(req, res, next) {
	res.json({ message: 'Welcome to the coolest API on earth!' });
});


router.post('/user', function(req, res, next) {
    console.log("find user");
    user.find(req, res);
    console.log("find user");
    
});



router.get('/all', function(req, res, next) {
	user.findAll(res);   
    console.log("findAll");
    
});




module.exports = router;