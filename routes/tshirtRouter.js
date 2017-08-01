 
var express = require('express');
var router = express.Router();
//var db = require("../../orientDBConfig.js");

var tshirt= require("../models/tshirtModel");

/* GET users listing. */
router.get('/findAll', function(req, res, next) {
	var tshirtResponse = tshirt.findall(res,req);
	console.log('active users', tshirtResponse);
});

router.get('/find/:id', function(req, res, next) {
	var tshirtResponse = tshirt.find(res,req);
	console.log('active church', tshirtResponse);
});

router.get('/findSingle/:id', function(req, res, next) {
	var tshirtResponse = tshirt.findSingle(res,req);
	console.log('active tshirt', tshirtResponse);
});

router.post('/add', function(req, res, next) {
	var users = tshirt.add(res,req);
	console.log('active users', users);
});

router.delete('/add/:id', function(req, res, next) {
	var users = tshirt.deleteRecord(res,req);
	console.log('active users', users);
});

router.put('/add', function(req, res, next) {
	var users = tshirt.update(res,req);
	console.log('active users', users);
});

module.exports = router;    
