 
var express = require('express');
var router = express.Router();
//var db = require("../../orientDBConfig.js");

var dormlist= require("../models/dormlistModel");

/* GET users listing. */
router.get('/findAll', function(req, res, next) {
	var dormlistResponse = dormlist.findall(res,req);
	console.log('active users', dormlistResponse);
});

router.get('/find/:id', function(req, res, next) {
	var dormlistResponse = dormlist.find(res,req);
	
});

router.get('/findByChurch/:id', function(req, res, next) {
	var dormlistResponse = dormlist.findByChurch(res,req);
	
});




router.get('/findSingle/:id', function(req, res, next) {
	var dormlistResponse = dormlist.findSingle(res,req);

});

router.post('/camperNotInDorm', function(req, res, next) {
	var dormlistResponse = dormlist.camperNotInDorm(res,req);

});

router.post('/camperInDorm', function(req, res, next) {
	var dormlistResponse = dormlist.camperInDorm(res,req);

});





router.post('/deletecampertodorm', function(req, res, next) {
	var dormlistResponse = dormlist.deletecampertodorm(res,req);

});


router.post('/addSecurity', function(req, res, next) {
	 dormlist.addSecurity(res,req);

});

router.post('/deleteSecurity', function(req, res, next) {
	dormlist.deleteSecurity(res,req);

});


router.post('/addCounceling', function(req, res, next) {
	 dormlist.addCounceling(res,req);

});

router.post('/deleteCounceling', function(req, res, next) {
	dormlist.deleteCounceling(res,req);

});

router.post('/addDormLeader', function(req, res, next) {
	 dormlist.addDormLeader(res,req);

});

router.post('/deleteDormLeader', function(req, res, next) {
	dormlist.deleteDormLeader(res,req);

});





router.post('/add', function(req, res, next) {
	var users  = dormlist.add(res,req);

});

router.post('/addcampertodorm', function(req, res, next) {
	var users  = dormlist.addcampertodorm(res,req);

});



router.post('/addDormCamper', function(req, res, next) {
	var users  = dormlist.addDormCamper(res,req);

});




router.delete('/add/:id', function(req, res, next) {
	var users = dormlist.deleteRecord(res,req);

});

router.put('/add', function(req, res, next) {
	var users = dormlist.update(res,req);
	
});

module.exports = router;    
