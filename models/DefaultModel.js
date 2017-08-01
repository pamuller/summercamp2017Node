"use strict";
var db = require("../orientDBConfig.js");

function DefaultModel() {


	  this.add = function(res,req){
          
          var vm = this;
          
          console.log("DefaultModel Add:");
          
		  var ii=0;
		  ii=1;
		 // db.insert().into('Company').set({companyReg: company.companyReg,organizationName:'organizationName', country: 'country', email: 'email', phoneNo: 'phoneNo', physicalAddress: 'physicalAddress', postalAddress: 'postalAddress', postalCode: '175', vatNo: 'vatNo', website: 'website'}).one()

		 /* db.insert().into('Company').set(req.body.company).one()
			.then(function (company) {
				console.log('created', company);
				res.send(company);

				//return company

			})*/
		  var obj=req.body.defaultModel;
		 //obj.province={'@rid':obj.province};
            console.log("defaultModel:"+req.body.defaultModel.toString());

			db.insert().into('|DefaultModel').set(req.body.defaultModel).one().then(function (defaultModel){
                 console.log("defaultModel Add 1:");
					  console.log(defaultModel); //an Array of records inserted
                 console.log("defaultModel Add 2:");
					 

					});




	  };



	  this.update = function(res,req){
		  var ii=0;
		  ii=1;

			var idd = req.body.defaultModel['@rid'];
			console.log("idd:"+idd);

			var obj=req.body.church;

			var updateString ='churchname = \''+obj.churchname+'\', address = \''+obj.address+'\', churchcontactno ='+JSON.stringify(obj.churchcontactno)+' ,province = '+obj.province['@rid'];         
          
			//console.log("updateString:"+updateString);
			db.update(idd).set(updateString).return('after @this').one()
				.then(function (total) {
				  console.log('updated', total, 'users');
				   res.send('updated', total, 'users');
                           
                  });



	  };


	  this.deleteRecord = function(res,req){
		  var ii=0;
		  ii=1;
			console.log("reg.body:"+req.params.id);
			db.delete('VERTEX').from('defaultModel')
			.where('@rid = #'+req.params.id)
			.one()
			.then(function (total) {
			  console.log('deleted', total, 'defaultModel');
			  res.send('Deleted '+total + ' records');
			});



	  };


	  this.find = function(res,req)
	  {
		// db.query('select from church where @rid='+req.params['id'] + ' fetchplan province:1').all()
		 db.select().from('defaultModel').where('province='+req.params['id']).fetch('province:1').all()
			.then(function (church) {
			  console.log('active users', church);
			  res.send(church);
		  });
	  };
    
     this.findall = function(res,req)
	  {
		  //db.query('select from church fetchplan *:1' ).all()
		db.select().from('defaultModel').fetch('province:1').all()
			.then(function (church) {
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
		db.select().from('defaultModel').fetch('province:1').all()
			.then(function (church) {
			  console.log('active users', church);
			  res.send(church);
		  });
	  };







}

var church = new Church();

module.exports = church;














