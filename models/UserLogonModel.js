
var db = require("../orientDBConfig.js");

var crypto = require('crypto');
//var companyuser= require("../models/CompanyUserModel");

function UserLogon() {
	  
	  
	  
	  
	  this.find = function(req, res)
	  {
          var obj = req.body;
          console.log(obj);
          
          var hash = crypto.createHash('sha256').update(req.body.password).digest('hex'); 
           console.log("hash:{SHA-256}"+hash.toUpperCase());
          
         var searchString = 'name=\''+ obj.email +'\' and password=\'{SHA-256}'+ hash.toUpperCase() +'\'';
		  db.select().from('OUser').where(searchString).all()
			.then(function (persons) {
			  console.log('active users', persons);
			   if("{SHA-256}"+hash.toUpperCase() == persons[0].password)
				 {
					 delete persons[0].password;
					 delete persons[0].active;
					 res.send(persons);
				 }else
				 {
					 res.send(null);
				 }
		  });
	  };
    
    
     this.findAdmin = function(req, res)
	  {
          var obj = req.body;
          console.log(obj);
          
          var hash = crypto.createHash('sha256').update(req.body.password).digest('hex'); 
           console.log("hash:{SHA-256}"+hash.toUpperCase());
          var searchString = 'select from ouser where name=\''+obj.email+'\' and roles=(select from ORole where name = \'SummerCampAdmin\') ';
		  db.select().from('OUser').where(searchString).all()
			.then(function (persons) {
			  console.log('active users', persons);
			   if("{SHA-256}"+hash.toUpperCase() == persons[0].password)
				 {
					 delete persons[0].password;
					 delete persons[0].active;
					 res.send(persons);
				 }else
				 {
					 res.send(null);
				 }
		  });
	  };
    
    
      this.findAll = function(req, res)
	  {
         db.select().from('OUser').all()
			.then(function (persons) {
			  console.log('active users', persons);
			  res.send(persons);
		  });
	  };
    
    
      
    

}

var userlogon = new UserLogon();

module.exports = userlogon;



