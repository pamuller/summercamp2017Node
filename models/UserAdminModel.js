
var db = require("../orientDBConfig.js");

var crypto = require('crypto');
//var companyuser= require("../models/CompanyUserModel");

function UserAdminModel() {
	  
	  this.find = function(res,req)
	  {
          console.log("UserAdminModel");
          var obj = req.body;
          console.log(obj);
          
          var hash = crypto.createHash('sha256').update(req.body.password).digest('hex'); 
           console.log("hash:{SHA-256}"+hash.toUpperCase());
          
          if(obj.camp == '#18:1')
              {
                  console.log('connectAdmin');
                  var searchString = 'name=\''+ req.body.username +'\' and password=\'{SHA-256}'+ hash.toUpperCase() +'\' and roles=(select from ORole where name = \'connectAdmin\')';
              }else{
                  console.log('SummerCampAdmin');
                  var searchString = 'name=\''+ req.body.username +'\' and password=\'{SHA-256}'+ hash.toUpperCase() +'\' and roles=(select from ORole where name = \'SummerCampAdmin\')';
              }
          
          
          console.log(searchString);
          
        // var searchString = 'name=\''+ req.body.username +'\' and password=\'{SHA-256}'+ hash.toUpperCase() +'\'';
		  db.select().from('OUser').where(searchString).all()
			.then(function (persons) {
			  console.log('active users', persons);
              if (persons.length > 0)
                  {  
                     delete persons[0].password;
					 delete persons[0].active;
                     res.send(persons);
                  
                }else{
                   // res.send(null); 
                    res.status(503);
                    res.send({ error: 'Username/Password incorrect' });
                }
		  }).catch(function (err) 
           {
                console.log("UserAdminModel  error"+err);
                   res.status(503);
                    res.send({ error: 'Server Connection ' });
       
            });
	  };
}

var userAdminModel = new UserAdminModel();

module.exports = userAdminModel;



