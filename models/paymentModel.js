"use strict";
var db = require("../orientDBConfig.js");
var dateFormat = require('dateformat');

function payment() {

this.add = function(res,req)
	  {
         var vm = this;
             console.log("payment Add:");

		  var obj=req.body;

            console.log("payment:"+req.body.toString());
           var camperid=req.body.camper;
            delete req.body.camper;
    
          req.body.paymentdate =  dateFormat(req.body.paymentdate,'yyyy-mm-dd');
    
		  db.insert().into('payment').set(req.body).one().then(function (objReturnAdd)
		  {
                 console.log("payment Add 1:");
              
                db.create('EDGE', 'paymentMade').to(objReturnAdd['@rid'].toString()).from(camperid).one()
                        .then(function (edge) {
                            // res.send(req.body.person);
                            console.log('created paymentMade edge');
                                res.send(objReturnAdd);
                           
                        });
              
              
                 
          });
	  };


this.update = function(res,req){
		  var ii=1;

		  console.log("reg.body:"+req.body);
			var idd = req.body['@rid'];
			console.log("idd:"+idd);
		   var obj=req.body;
			var updateString = 'paymentamount = '+obj.paymentamount+',paymenttypes = {"paymenttype":"'+obj.paymenttypes.paymenttype+'"},paymentdate = \''+dateFormat(obj.paymentdate,'yyyy-mm-dd')+'\'';


			db.update(idd).set(updateString).return('after @this').one()
				.then(function (objReturnUpdate) 
				{
                
                  objReturnUpdate.paymentdate = dateFormat(objReturnUpdate.paymentdate,'yyyy-mm-dd');
                  
				  console.log('updated', objReturnUpdate, 'users');
				  res.send( objReturnUpdate);
                });
	  };


this.deleteRecord = function(res,req){
		  var ii=1;
			console.log("reg.body:"+req.params.id);

			db.delete('VERTEX').from('payment')
			.where('@rid = #'+req.params.id)
			.one()
			.then(function (objReturnDelete) {
			  console.log('Deleted', objReturnDelete, 'payment');
			  res.send('Deleted '+objReturnDelete + 'records');
			});
	  };


this.find = function(res,req)
	  {
		 db.select().from('payment').where('in(\'paymentMade\')[\'@rid\']='+req.params['id']).all()
			.then(function (objReturnFind) {
			  console.log('active users', objReturnFind);
			  res.send(objReturnFind);
		  });
	  };
    
this.getCamperPayInfo = function(res,req)
	  {
		 db.select().from('payment').where('in(\'paymentMade\')[\'@rid\']='+req.params['id']).all()
			.then(function (objReturnFind) {
			  console.log('active users', objReturnFind);
			  res.send(objReturnFind);
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
	    			.then(function(objReturnFindId) {
                     console.log("objReturnFindId:"+objReturnFindId);
	    				return objReturnFindId;
	    			});
	  };

 this.findSingle = function(res,req)
	  	  {

  db.select().from('payment').where('@rid='+req.params['id']).all()
         .then(function (objReturnFindAll) {
   		  console.log('active obj', objReturnFindAll);
	  	  res.send(objReturnFindAll);
		  });
	  };

this.findall = function(res,req)
	  {
		db.select().from('payment').all()
			.then(function (objReturnFindAll) {
			  console.log('active users', objReturnFindAll);
			  res.send(objReturnFindAll);
		  });
	  };
}
 
var payment = new payment();

module.exports = payment;