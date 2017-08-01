"use strict";
var db = require("../orientDBConfig.js");

function Notes() {

this.add = function(res,req)
	  {
         var vm = this;
             console.log("Notes Add:");

		  var obj=req.body;

            console.log("Notes:"+req.body.toString());
       var inputString = "note='"+req.body.note +"'";
     console.log("inputString:"+inputString);
		  db.insert().into('notes').set(inputString).one().then(function (objReturnAdd)
		  {
               console.log("objReturnAdd:"+objReturnAdd);
              var noteid = objReturnAdd['@rid'];
                console.log("req.body.church[0]:"+req.body.church);
              var churchid = req.body.church['@rid'];
              db.create('EDGE','Nedge').to(churchid).from(noteid).one()
                         .then(function(edge){
                            // res.send(req.body.person);
                             console.log('created notesEdge');
                              objReturnAdd.rid= objReturnAdd['@rid'];
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
			var updateString = 'note = \''+obj.note+'\',church = \''+obj.church+'\'';


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
    
           db.select().from('nedge').where('out= #'+req.params.id).one()
			.then(function (objReturnFind) {
               console.log("objReturnFind:"+JSON.stringify(objReturnFind));
                      db.delete('EDGE','nedge')
                    .where('@rid = '+objReturnFind['@rid'])
                    .one()
                    .then(function (objReturnDelete) {
                      console.log('Deleted', objReturnDelete, 'notes');
                           db.delete('VERTEX','notes')
                        .where('@rid = '+req.params.id)
                        .one()
                        .then(function (objReturnDelete) {
                          console.log('Deleted2', objReturnDelete, 'notes');
                          res.send('Deleted 2'+objReturnDelete + 'records');
                        });
                    });
              
               
		  });
    
    
	  };


this.find = function(res,req)
	  {
		 db.select().from('notes').where('province='+req.params['id']).all()
			.then(function (objReturnFind) {
			  console.log('active users', objReturnFind);
			  res.send(objReturnFind);
		  });
	  };

 this.findById = function(id)
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

  db.select().from('notes').where('@rid='+req.params['id']).all()
         .then(function (objReturnFindAll) {
   		  console.log('active obj', objReturnFindAll);
	  	  res.send(objReturnFindAll);
		  });
	  };

this.findall = function(res,req)
	  {
		db.select('@rid, note , out(\'Nedge\').churchname[0] as churchname,out(\'Nedge\')[0] as nedge').from('notes').all()
			.then(function (objReturnFindAll) {
			  console.log('active users', objReturnFindAll);
			  res.send(objReturnFindAll);
		  });
	  };
}
 
var notes = new Notes();

module.exports = notes;