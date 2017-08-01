//to call use http://localhost:3000/province
"use strict";
var express = require('express');
var router = express.Router();
//var db = require("../orientDBConfig.js");

var storeDocModel= require("../models/storeDocModel");


/* GET province listing. */
router.get('/find:id', function(req, res, next) {

console.log('get docs');
	storeDocModel.find(res,req);

});


/* Add province. */
router.post('/upload', function(req, res, next) {

    console.log('upload docs');
	storeDocModel.upload(res,req);
	
});


router.get('/download:filename', function(req, res, next) {

    console.log('upload docs');
	storeDocModel.downloadFile(res,req);
	
});



/* Delete province. 
router.delete('/add:id', function(req, res, next) {

console.log('delete docs');
	storeDocModel.delete(res,req);
	

});});


/* Update province. 
router.put('/add', function(req, res, next) {
    console.log('update docs');
	storeDocModel.update(res,req);
	
});*/

module.exports = router;