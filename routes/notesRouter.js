 
var express = require('express');
var router = express.Router();
//var db = require("../../orientDBConfig.js");

var notes= require("../models/notesModel");

/* GET users listing. */
router.get('/findAll', function(req, res, next) {
	var notesResponse = notes.findall(res,req);
	console.log('active users', notesResponse);
});

router.get('/find/:id', function(req, res, next) {
	var notesResponse = notes.find(res,req);
	console.log('active church', notesResponse);
});

router.get('/findSingle/:id', function(req, res, next) {
	var notesResponse = notes.findSingle(res,req);
	console.log('active notes', notesResponse);
});

router.post('/add', function(req, res, next) {
	var users  = notes.add(res,req);
	console.log('active users', users);
});

router.delete('/add/:id', function(req, res, next) {
	var users = notes.deleteRecord(res,req);
	console.log('active users', users);
});

router.put('/add', function(req, res, next) {
	var users = notes.update(res,req);
	console.log('active users', users);
});

module.exports = router;    
