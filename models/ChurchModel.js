"use strict";
var db = require("../orientDBConfig.js");
var nodemailer = require('nodemailer');

function Church() {


	  this.add = function(res,req){
          
          var vm = this;
          
          console.log("church Add:");
          
		  var ii=0;
		  ii=1;
		 // db.insert().into('Company').set({companyReg: company.companyReg,organizationName:'organizationName', country: 'country', email: 'email', phoneNo: 'phoneNo', physicalAddress: 'physicalAddress', postalAddress: 'postalAddress', postalCode: '175', vatNo: 'vatNo', website: 'website'}).one()

		 /* db.insert().into('Company').set(req.body.company).one()
			.then(function (company) {
				console.log('created', company);
				res.send(company);

				//return company

			})*/
		  var obj=req.body.church;
		 //obj.province={'@rid':obj.province};
            console.log("church:"+req.body.church.toString());
            console.log("youthleader:"+req.body.youthleader);
           // db.insert().into('person').set(req.body.church).one()
            
			db.insert().into('church').set(req.body.church).one().then(function (church){
                 console.log("church Add 1:");
					  console.log(church); //an Array of records inserted
                 console.log("church Add 2:");
					  if (req.body.youthleader.lastname != null)
						  {
						  db.insert().into('person').set(req.body.youthleader).one().then(function (person){
							  console.log("people:"+JSON.stringify(person));
							  
									 db.query('create edge youthpaster from '+person['@rid']  +' to '+ church['@rid']
									 ).then(function (response){
									  console.log(response); //an Array of records inserted
									 
									  	//create logon user
									    var personSingle = {};
									    personSingle.name = req.body.youthleader.email;
									    personSingle.password ="password";
									   // personSingle.roles = "{'@rid':#5:2}";
									    personSingle.status = "ACTIVE";
									  
									    db.insert().into('OUser').set(personSingle).one()
										.then(function (personSingle) {
										 	  var idd = church['@rid'];
                                             console.log("idd:"+idd);
                                               /*db.query( 'SELECT EXPAND( $c ) LET ' +
                                                    '$a = ( select expand(in(\'youthpaster\')) from church where @rid='+idd+'), ' +
                                                    '$b = ( select from church where @rid='+idd+' ), ' +
                                                    '$c = UNIONALL( $a, $b )' ,{
                                                        fetchPlan : "province:1"
                                                    })
                                                    .then(function(results) {
                                                        res.send(results);
                                                    }); */
											//res.send(person);
                                            res.send(church);
										});
									  	
									  	
									});
								});
						  }else
							  {
							  //get full church info from db
							 // res.send(church);
                                   console.log("church search:"+church);
                                    var idd = church['@rid'];
                                 console.log("idd:"+idd);
                                   db.query( 'SELECT EXPAND( $c ) LET ' +
                                        '$a = ( select expand(in(\'youthpaster\')) from church where @rid='+idd+'), ' +
                                        '$b = ( select from church where @rid='+idd+' ), ' +
                                        '$c = UNIONALL( $a, $b )' ,{
                                            fetchPlan : "province:1"
                                        })
                                        .then(function(results) {
                                            res.send(results);
                                        });
							  }

					});




		    /* db.insert().into('church').set(obj).one()
			.then(function (church) {
				console.log('created', church);
				return church;
				//return company

			}).then(function(church)
			{
				res.send(church);
			});
	       */


	  };



	  this.update = function(res,req){
		  var ii=0;
		  ii=1;
		 // db.insert().into('Company').set({companyReg: company.companyReg,organizationName:'organizationName', country: 'country', email: 'email', phoneNo: 'phoneNo', physicalAddress: 'physicalAddress', postalAddress: 'postalAddress', postalCode: '175', vatNo: 'vatNo', website: 'website'}).one()

		  console.log("reg.body:"+req.body);
			var idd = req.body.church['@rid'];
			console.log("idd:"+idd);
			//delete req.body['@rid'];
			//db.query('insert into church (churchname, address, youthleaderName,province,youthleaderemail,youthleadercell,churchcontactno,youthleaderSurname) values (:name, :password, :status
			var obj=req.body.church;
            console.log("obj.churchcontactno:"+ JSON.stringify(obj.churchcontactno));
			var updateString ='churchname = \''+obj.churchname+'\', email = \''+obj.email+'\', postaladdress = \''+obj.postaladdress+'\', address = \''+obj.address+'\', churchcontactno ='+JSON.stringify(obj.churchcontactno)+' ,province = '+obj.province['@rid'];
          
          
          
			//console.log("updateString:"+updateString);
			db.update(idd).set(updateString).return('after @this').one()
				.then(function (total) {
				  console.log('updated', total, 'users');
				  //res.send('updated', total, 'users');
                if (req.body.youthleader.lastname != null)
                  {
                      var obj=req.body.youthleader;
                      
                      if(req.body.youthleader['@rid'] == undefined)
                          {
                              church.addYouthPastor(res,req);
                              
                          }else
                          {
                          
                              
                                var idyouthleader = req.body.youthleader['@rid'];
                                console.log("obj.youthleader:"+ JSON.stringify(obj.contactno));
                                var updateString ='firstname = \''+obj.firstname+'\', lastname = \''+obj.lastname+'\', contactno = '+JSON.stringify(obj.contactno)+' ,email = \''+obj.email+'\'';

                                 if (obj.persontype != null)
                               {
                                   updateString = updateString + ', persontype = \''+obj.persontype+'\'';
                               }  

                                  db.update(idyouthleader).set(updateString).return('after @this').one()
                                  .then(function (total) {
                                        res.send(total);     
                                  })
                              
                              
                              
                          }
                      
                      
                    
                           
				}else{
                            
                     res.send(total);       
                 }
                           
                  });




		  /*
		     db.insert().into('Company').set(req.body).one()
			.then(function (company) {
				console.log('created', company);
				return company;
				//return company

			}).then(function(company){

				agent.addCompanyAgent(company,req.body.person);

			}).then(function()
			{
				res.send("Done");
			});

		   */

	  };


	  this.deleteRecord = function(res,req){
		  var ii=0;
		  ii=1;
		 // db.insert().into('Company').set({companyReg: company.companyReg,organizationName:'organizationName', country: 'country', email: 'email', phoneNo: 'phoneNo', physicalAddress: 'physicalAddress', postalAddress: 'postalAddress', postalCode: '175', vatNo: 'vatNo', website: 'website'}).one()

			console.log("reg.body:"+req.params.id);

			db.delete('VERTEX').from('church')
			.where('@rid = #'+req.params.id)
			.one()
			.then(function (total) {
			  console.log('deleted', total, 'church');
			  res.send('Deleted '+total + ' records');
			});



	  };


	  this.find = function(res,req)
	  {
		// db.query('select from church where @rid='+req.params['id'] + ' fetchplan province:1').order('churchname').all()
		 db.select().from('church').where('province='+req.params['id']).fetch('province:1').order('churchname').all()
			.then(function (church) {
               church.push({'@rid':'#0:0','churchname':'Not listed'});
			  console.log('active users', church);
			  res.send(church);
		  });
	  };
    
    

      this.findSingleById = function(id)
	  	  {
	    console.log("findSingleById");	
	    console.log("id:"+id);		 
	    	
	    db.query( 'SELECT EXPAND( $c ) LET ' +
	    			'$a = ( select expand(in(\'youthpaster\')) from church where @rid='+id+'), ' +
	    			'$b = ( select from church where @rid='+id+' ), ' +
	    			'$c = UNIONALL( $a, $b )' ,{
	    		        fetchPlan : "province:1"
	    		    })
	    			.then(function(results) {
                  
                     console.log("results:"+results);
	    				return results;
	    			});
 

	  };
    
    
    
    

	    this.findSingle = function(res,req)
	  	  {
	    	/*db.let('$a',function(s){
	    		  s.select('select expand(in(\'youthpaster\')) from church where @rid=#12:36');
	    	}).let('$b',function(s){
	    		  s.select('select from church where @rid=#12:36');
	    	}).let('$c',function(c){
	    		  c.select(unionall('$a','$b'));
	    	}).commit().return('$c')
	    	.all()
	  			.then(function (church) {
	  			  console.log('active users', church);
	  			  res.send(church);
	  		  });*/
	    	 
	    	
	    db.query( 'SELECT EXPAND( $c ) LET ' +
	    			'$a = ( select expand(in(\'youthpaster\')) from church where @rid=#'+req.params['id']+'), ' +
	    			'$b = ( select from church where @rid=#'+req.params['id']+' ), ' +
	    			'$c = UNIONALL( $a, $b )' ,{
	    		        fetchPlan : "province:1"
	    		    })
	    			.then(function(results) {
	    				res.send(results);
	    			});
 
	    	
	    	
	  		// db.query('select from church where @rid='+req.params['id'] + ' fetchplan province:1').all()
	  		/* db.select().from('church').where('@rid=#'+req.params['id']).fetch('province:1').all()
	  			.then(function (church) {
	  			  console.log('active users', church);
	  			  res.send(church);
	  		  });*/
	  };

    
    
    

	  this.findall = function(res,req)
	  {
		  //db.query('select from church fetchplan *:1' ).all()
		db.select().from('church').fetch('province:1').all()
			.then(function (church) {
			  console.log('active users', church);
			  res.send(church);
		  });
	  };
    
    
    this.addYouthPastor = function(res,req)
    {
        var church = req.body.church;
        
         db.insert().into('person').set(req.body.youthleader).one().then(function (person){
							  console.log("people:"+JSON.stringify(person));
							  
									 db.query('create edge youthpaster from '+person['@rid']  +' to '+ church['@rid']
									 ).then(function (response){
									  console.log(response); //an Array of records inserted
									 
									  	//create logon user
									    var personSingle = {};
									    personSingle.name = req.body.youthleader.email;
									    personSingle.password ="password";
									   // personSingle.roles = "{'@rid':#5:2}";
									    personSingle.status = "ACTIVE";
									  
									    db.insert().into('OUser').set(personSingle).one()
										.then(function (personSingle) {
										 	  var idd = church['@rid'];
                                             console.log("idd:"+idd);
                                               res.send("Updated");
											//res.send(person);
										});
									  	
									  	
									});
								});
        
    }
    
    
    this.resetYouthPastor = function(res,req)
    {
         console.log("r1:");
         console.log("req.body.youthpastor:"+req.body.youthpastor);
          console.log("req.body.youthpastor:"+JSON.stringify(req.body));
         var idd =  req.body.youthpastor;
        
        var chars = "ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz";
        var string_length = 8;
        var randomstring = '';
        var charCount = 0;
        var numCount = 0;
  console.log("r2:");
        for (var i=0; i<string_length; i++) {
            // If random bit is 0, there are less than 3 digits already saved, and there are not already 5 characters saved, generate a numeric value. 
            if((Math.floor(Math.random() * 2) == 0) && numCount < 3 || charCount >= 5) {
                var rnum = Math.floor(Math.random() * 10);
                randomstring += rnum;
                numCount += 1;
            } else {
                // If any of the above criteria fail, go ahead and generate an alpha character from the chars string
                var rnum = Math.floor(Math.random() * chars.length);
                randomstring += chars.substring(rnum,rnum+1);
                charCount += 1;
            }
        }
          console.log("r2:");
        var updateString = 'password=\''+ randomstring+'\'';
        console.log("updateString:"+updateString);
        
         db.query('select @rid,name from OUser where name in (select in(\'youthpaster\').email[0] from  '+idd+')' ).then(function (response){
             
              console.log("youthpastor id:"+JSON.stringify(response));
              console.log("youthpastor id:"+response[0]['rid']);
              db.update(response[0]['rid']).set(updateString).one()
				.then(function (total) {
				 var password =  {};
                 password.password=randomstring;
                  password.name=response[0]['name'];
                console.log("randomstring:"+randomstring);
                   
                  church.sendEmail(password);    
				  res.send(password);
                  
                           
                  });
             
									
									  	
	});
        
        
        
       
        
    }
    
    
    
    
    this.sendEmail = function (person) {
        var smtpConfig = {
            host: 'mail.waps.co.za'
            , port: 587
            , secure: false, // use SSL
            auth: {
                user: 'amuller@waps.co.za'
                , pass: 'c3mn-e'
            }
            , tls: {
                rejectUnauthorized: false
            }
        };



        var transporter = nodemailer.createTransport(smtpConfig);


        var mailOptions = {
            from: 'summercamp@waterkloofbaptist.org.za', // sender address
            to: 'dan@waterkloofbaptist.org.za', // list of receivers
            bcc: 'pamuller@waps.co.za', // list of receivers
            subject: 'Summercamp Youth Admin : ', // Subject line
            text:"name:"+person.name + " pass:"+person.password
        };

        // send mail with defined transport object
        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                return console.log(error);
            }
            console.log('Message sent: ' + info.response);
        });

    }







}

var church = new Church();

module.exports = church;














