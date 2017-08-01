 
var express = require('express');
var router = express.Router();
//var db = require("../../orientDBConfig.js");

var search= require("../models/searchModel");

/* GET users listing. */


router.post('/find', function(req, res, next) {
	var searchResponse = search.find(res,req);
	console.log('find');

});





module.exports = router;    
