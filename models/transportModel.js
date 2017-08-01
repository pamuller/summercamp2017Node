"use strict";
var db = require("../orientDBConfig.js");

function transport() {

this.add = function(res,req)
	  {
         var vm = this;
             console.log("transport Add:");

		  var obj=req.body.transport;

            console.log("transport:"+req.body);
		  db.insert().into('transport').set(req.body).one().then(function (objReturnAdd)
		  {
                 console.log("transport Add 1:");
                  res.send(objReturnAdd);
          });
	  };


this.update = function(res,req){
		  var ii=1;

		  console.log("reg.body:"+req.body);
			var idd = req.body.church['@rid'];
			console.log("idd:"+idd);
		   var obj=req.body.church;
            console.log("obj.churchcontactno:"+ JSON.stringify(obj.churchcontactno));
			var updateString ='Add statement here';


			db.update(idd).set(updateString).return('after @this').one()
				.then(function (objReturnUpdate) 
				{
				  console.log('updated', objReturnUpdate, 'users');
				  res.send('updated', objReturnUpdate, 'users');
                });
	  };


this.deleteRecord = function(res,req){
		  var ii=1;
			console.log("reg.body:"+req.params.id);

			db.delete('VERTEX').from('transport')
			.where('@rid = #'+req.params.id)
			.one()
			.then(function (objReturnDelete) {
			  console.log('Deleted', objReturnDelete, 'transport');
			  res.send('Deleted '+objReturnDelete + 'records');
			});
	  };


this.find = function(res,req)
	  {
		 db.select().from('transport').where('province='+req.params['id']).all()
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

  db.select().from('transport').where('@rid='+req.params['id']).all()
         .then(function (objReturnFindAll) {
   		  console.log('active obj', objReturnFindAll);
	  	  res.send(objReturnFindAll);
		  });
	  };

this.findall = function(res,req)
	  {
		db.select().from('transport').all()
			.then(function (objReturnFindAll) {
			  console.log('active users', objReturnFindAll);
			  res.send(objReturnFindAll);
		  });
	  };
}
 
var transport = new transport();

module.exports = transport;