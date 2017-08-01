 
var express = require('express');
var router = express.Router();
//var db = require("../../orientDBConfig.js");

var transport= require("../models/transportModel");

/* GET users listing. */
router.get('/findAll', function(req, res, next) {
	var transportResponse = transport.findall(res,req);
	console.log('active users', transportResponse);
});

router.get('/find/:id', function(req, res, next) {
	var transportResponse = transport.find(res,req);
	console.log('active church', transportResponse);
});

router.get('/findSingle/:id', function(req, res, next) {
	var transportResponse = transport.findSingle(res,req);
	console.log('active transport', transportResponse);
});

router.post('/add', function(req, res, next) {
	var users = transport.add(res,req);
	console.log('active users', users);
});

router.delete('/add/:id', function(req, res, next) {
	var users = transport.deleteRecord(res,req);
	console.log('active users', users);
});

router.put('/add', function(req, res, next) {
	var users = transport.update(res,req);
	console.log('active users', users);
});

module.exports = router;    
