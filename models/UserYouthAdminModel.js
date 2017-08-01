
var db = require("../orientDBConfig.js");

var crypto = require('crypto');
//var companyuser= require("../models/CompanyUserModel");

function UserYouthAdminModel() {
    
    
     this.resetpassword = function(res,req)
     {
           var hash = crypto.createHash('sha256').update(req.body.passwordold).digest('hex'); 
           console.log("hash:{SHA-256}"+hash.toUpperCase());
          
         var searchString = 'name=\''+ req.body.username +'\' and password=\'{SHA-256}'+ hash.toUpperCase() +'\'';
		  db.select().from('OUser').where(searchString).all()
			.then(function (persons) {
			  console.log('active users', persons.length );
              if (persons.length > 0)
                  {
 
                   if("{SHA-256}"+hash.toUpperCase() == persons[0].password)
                     {
                          console.log('update password');
                          console.log('persons[0][@rid]'+persons[0]);
                         
                         var updateString ='password  = \''+req.body.password1+'\', resetpassword = false';
                         
                          console.log('updateString'+updateString);
                         
                              db.update(persons[0]['@rid']).set(updateString).return('after @this').one()
                              .then(function (total) {
                                  
                                    req.body.password = req.body.password1;
                                    userYouthAdminModel.find(res,req);
                              })
                         
                         //delete persons[0].password;
                        // delete persons[0].active;
                         
                     }else
                     {
                         res.send(null);
                     }
                }else{
                   // res.send(null); 
                    res.status(503);
                    res.send({ error: 'logon' });
                }
		  });
         
     }
    
    
	  
	  this.find = function(res,req)
	  {
          var obj = req.body;
          console.log(obj);
          
          var hash = crypto.createHash('sha256').update(req.body.password).digest('hex'); 
           console.log("hash:{SHA-256}"+hash.toUpperCase());
          
         var searchString = 'name=\''+ req.body.username +'\' and password=\'{SHA-256}'+ hash.toUpperCase() +'\'';
		  db.select().from('OUser').where(searchString).all()
			.then(function (persons) {
			  console.log('active users', persons);
              if (persons.length > 0)
                  {
                    
                      
                      
                   if("{SHA-256}"+hash.toUpperCase() == persons[0].password)
                     {
                          db.select('expand(out(\'youthpaster\'))').from('person').where('email=\''+persons[0].name+'\'').all().then(function(church)
                          {
                               console.log('persons[0].resetpassword', persons[0].resetpassword);
                                if (persons[0].resetpassword)
                                {
                                     console.log('persons[0].resetpassword2');
                                    church[0].resetpassword = 'true';
                                }
                              
                              res.send(church);
                          })
                         
                         //delete persons[0].password;
                        // delete persons[0].active;
                         
                     }else
                     {
                         res.send(null);
                     }
                }else{
                   // res.send(null); 
                    res.status(503);
                    res.send({ error: 'logon' });
                }
		  }).catch(function (err) 
           {
                   console.log("UserAdminModel  error"+err);
                   res.status(503);
                   res.send({ error: 'Server Connection Issue' });
       
            });
              
          
	  };
    
    
     
    
    
      
    

}

var userYouthAdminModel = new UserYouthAdminModel();

module.exports = userYouthAdminModel;



