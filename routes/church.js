//to call use http://localhost:3000/company

var express = require('express');
var router = express.Router();
//var db = require("../orientDBConfig.js");

var church= require("../models/ChurchModel");
//var campuser= require("../models/UserModel");

/* GET users listing. */
router.get('/findAll', function(req, res, next) {
	var churches = church.findall(res,req);
	console.log('active users', churches);
});

router.get('/find/:id', function(req, res, next) {
	var churches = church.find(res,req);
	console.log('active church', church);
});

router.get('/findSingle/:id', function(req, res, next) {
	var churches = church.findSingle(res,req);
	console.log('active church', church);
});

router.get('/findByProvince/:id', function(req, res, next) {
	var churches = church.find(res,req);
	console.log('active church', church);
});

router.post('/add', function(req, res, next) {
	var users = church.add(res,req);
	console.log('active users', users);
});

router.post('/addYouthPastor', function(req, res, next) {
    console.log('addYouthPastor');
	church.addYouthPastor(res,req);
	
});


router.post('/resetYouthPastor', function(req, res, next) {
    console.log('resetYouthPastor');
	church.resetYouthPastor(res,req);
	
});




router.post('/addChurch', function(req, res, next) {
	var users = church.add(res,req);
	console.log('active users', users);
});

router.delete('/add/:id', function(req, res, next) {
	var users = church.deleteRecord(res,req);
	console.log('active users', users);
});

router.post('/deleteChurch', function(req, res, next) {
	var users = church.delete(res,req);
	console.log('active users', users);
});

router.put('/add', function(req, res, next) {
	var users = church.update(res,req);
	console.log('active users', users);
});


module.exports = router;