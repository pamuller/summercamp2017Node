//to call use http://localhost:3000/company

var express = require('express');
var router = express.Router();
//var db = require("../orientDBConfig.js");

var mailmessage= require("../models/EmailMessageModel");


/* GET users listing. */

router.delete('/add/:id', function(req, res, next) {
	var message = mailmessage.deleteRecord(res,req);
	console.log('active message', message);
});



router.get('/findAll', function(req, res, next) {
	var message = mailmessage.findall(res,req);
	console.log('active message', message);
});


router.get('/find/:id', function(req, res, next) {
	var message = mailmessage.find(res,req);
	console.log('active message', message);
});



router.post('/add', function(req, res, next) {
	var message = mailmessage.add(res,req);
	console.log('active message', message);
});


router.put('/add', function(req, res, next) {
	var message = mailmessage.update(res,req);
	console.log('active message', message);
});


module.exports = router;