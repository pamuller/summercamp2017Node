//to call use http://localhost:3000/province
"use strict";
var express = require('express');
var router = express.Router();
//var db = require("../orientDBConfig.js");

var provinceModel= require("../models/provinceModel");


/* GET province listing. */
router.get('/findAll', function(req, res, next) {


	let provinces = provinceModel.findall(res,req);
	console.log('active users', provinces);

});


/* Add province. */
router.post('/add', function(req, res, next) {


	let provinces = provinceModel.add(res,req);
	console.log('active users', provinces);

});


/* Delete province. */
router.delete('/add:id', function(req, res, next) {


	let provinces = provinceModel.delete(res,req);
	console.log('active users', provinces);

});

/* Update province. */
router.put('/add', function(req, res, next) {

	let provinces = provinceModel.update(res,req);
	console.log('active users', provinces);
});

module.exports = router;