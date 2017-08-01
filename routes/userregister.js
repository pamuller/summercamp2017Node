//to call use http://localhost:3000/province
"use strict";
var express = require('express');
var router = express.Router();
//var db = require("../orientDBConfig.js");

var userRegisterModel= require("../models/userRegisterModel");


/* GET province listing. */
router.get('/findAll', function(req, res, next) {


	let provinces = userRegisterModel.findall(res,req);
	console.log('active users', provinces);

});




router.get('/findByChurch/:id', function(req, res, next) {


	let registerlist = userRegisterModel.findByChurch(req,res);
	console.log('find by church', registerlist);

});

router.get('/findCampersSmallByChurch/:id', function(req, res, next) {

	console.log('findCampersSmallByChurch');
	let registerlist = userRegisterModel.findCampersSmallByChurch(req,res);


});

router.get('/findCampersSmallByChurchCode/:id', function(req, res, next) {

	console.log('findCampersSmallByChurchCode');
	let registerlist = userRegisterModel.findCampersSmallByChurchCode(req,res);


});




router.get('/downloadDoc/:id', function(req, res, next) {

	console.log('downloadDoc');
	let registerlist = userRegisterModel.downloadDoc(req,res);


});



router.get('/getCamperInfo/:id', function(req, res, next) {
    
    console.log('findCamperInfo');
	let registerlist = userRegisterModel.getCamperInfo(req,res);
	

});


router.get('/findParent/:id', function(req, res, next) {

	let registerlist = userRegisterModel.findParent(req,res);
	console.log('find findParent', registerlist);

});

router.post('/mail', function(req, res, next) {

	let registerlist = userRegisterModel.sendEmailDoc(req,res);
	

});


router.get('/getCamperInfo/:id', function(req, res, next) {
    console.log('find getCamperInfo');
	let registerlist = userRegisterModel.getCamperInfo(req,res);
	

});





/* Add province. */
router.post('/add', function(req, res, next) {


	let userRegister = userRegisterModel.add(res,req);
	console.log('active users', userRegister);

});


/* Delete province. */
router.delete('/add:id', function(req, res, next) {


	let provinces = userRegisterModel.delete(res,req);
	console.log('active users', provinces);

});

/* Update province. */
router.put('/add', function(req, res, next) {

	let userRegister = userRegisterModel.update(res,req);
	console.log('active users', userRegister);
});

module.exports = router;