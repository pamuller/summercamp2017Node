"use strict";
var db = require("../orientDBConfig.js");

function MailMessage() {


	  this.add = function(res,req){
          
          var vm = this;
          
          console.log("Add Record:");
          
		  var ii=0;
		  ii=1;

		  var obj=req.body;
		 //obj.province={'@rid':obj.province};
            console.log("record:"+req.body);
           // db.insert().into('person').set(req.body.mailmessage).one()
            
			db.insert().into('mailmessage').set(req.body).one().then(function (mailmessage){
                 console.log("mailmessage Add 1:");
					  console.log(mailmessage); //an Array of records inserted
                      res.send(mailmessage);
					});

	  };

	  this.deleteRecord = function(res,req){
		  var ii=0;
		  ii=1;
		 // db.insert().into('Company').set({companyReg: company.companyReg,organizationName:'organizationName', country: 'country', email: 'email', phoneNo: 'phoneNo', physicalAddress: 'physicalAddress', postalAddress: 'postalAddress', postalCode: '175', vatNo: 'vatNo', website: 'website'}).one()

			console.log("reg.body:"+req.params.id);

			db.delete('VERTEX').from('mailmessage')
			.where('@rid = #'+req.params.id)
			.one()
			.then(function (total) {
			  console.log('deleted', total, 'mailmessage');
			  res.send('Deleted '+total + ' records');
			});



	  };


     this.findall = function(res,req)
	  {
		  //db.query('select from church fetchplan *:1' ).all()
		db.select().from('mailmessage').all()
			.then(function (mailmessage) {
			  console.log('active users', mailmessage);
			  res.send(mailmessage);
		  });
	  };
    
    
    
      this.find = function(res,req)
        { 
              db.select().from('mailmessage').where('@rid=#'+req.params['id']).all()
                .then(function (mailmessage) {
                  console.log('active users', mailmessage);
                  res.send(mailmessage);
              });
          
          
          
	     /* db.query( 'SELECT EXPAND( $c ) LET ' +
	    			'$a = ( select expand(in(\'youthpaster\')) from church where @rid=#'+req.params['id']+'), ' +
	    			'$b = ( select from church where @rid=#'+req.params['id']+' ), ' +
	    			'$c = UNIONALL( $a, $b )' ,{
	    		        fetchPlan : "province:1"
	    		    })
	    			.then(function(results) {
	    				res.send(results);
	    			});*/
 
	   };
    
    
      this.update = function(res,req){
		  var ii=0;
		  ii=1;
		 // db.insert().into('Company').set({companyReg: company.companyReg,organizationName:'organizationName', country: 'country', email: 'email', phoneNo: 'phoneNo', physicalAddress: 'physicalAddress', postalAddress: 'postalAddress', postalCode: '175', vatNo: 'vatNo', website: 'website'}).one()

		  console.log("reg.body:"+req.body.toString());
			var idd = req.body['@rid'];
			console.log("idd:"+idd);
			var obj=req.body;
			var updateString ='messagename = \''+obj.messagename+'\', message = \''+obj.message+'\'';         
          
			//console.log("updateString:"+updateString);
			db.update(idd).set(updateString).return('after @this').one()
				.then(function (mailmessage) {
				  console.log('updated', mailmessage);
                      res.send(mailmessage);
                  });



	  };

	 
}

var mailmessage = new MailMessage();

module.exports = mailmessage;














