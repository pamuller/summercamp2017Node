"use strict"; 
var express = require('express');
var router = express.Router();
//var db = require("../../orientDBConfig.js");

var payment= require("../models/paymentModel");

/* GET users listing. */
router.get('/findAll', function(req, res, next) {
	var paymentResponse = payment.findall(res,req);
	console.log('active users', paymentResponse);
});

router.get('/find/:id', function(req, res, next) {
	var paymentResponse = payment.find(res,req);
	console.log('active church', paymentResponse);
});

router.get('/findSingle/:id', function(req, res, next) {
	var paymentResponse = payment.findSingle(res,req);
	console.log('active payment', paymentResponse);
});


router.get('/getCamperPayInfo/:id', function(req, res, next) {
    
    console.log('findCamperInfo');
	let registerlist = payment.getCamperPayInfo(req,res);
	

});

router.post('/add', function(req, res, next) {
	var users  = payment.add(res,req);
	console.log('active users', users);
});

router.delete('/add/:id', function(req, res, next) {
	var users = payment.deleteRecord(res,req);
	console.log('active users', users);
});

router.put('/add', function(req, res, next) {
	var users = payment.update(res,req);
	console.log('active users', users);
});

module.exports = router;    
