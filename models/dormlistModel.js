"use strict";
var db = require("../orientDBConfig.js");

function DormList() {

this.add = function(res,req)
	  {
         var vm = this;
             console.log("DormList Add:");

		  var obj=req.body;

            console.log("DormList:"+JSON.stringify(req.body.dormlist));


           var church = req.body.church;


     db.select('max(listid)').from('dormlist').where('in(dormlistEdge)[\'@rid\'] = '+church['@rid']).one()
			.then(function (objcountId) {

         if(objcountId == undefined)
             {
                 objcountId = {}
                 objcountId.max=0;
             }

          req.body.dormlist.listid=objcountId.max+1;

			  db.insert().into('dormlist').set(req.body.dormlist).one().then(function (objReturnAdd)
		  {
                 console.log("dormlist Add 1:");

               db.create('EDGE', 'dormlistEdge').to(objReturnAdd['@rid'].toString()).from(church['@rid']).one()
                            .then(function (edge) {
                                // res.send(req.body.person);
                                //console.log('created otherEdge');

                                res.send(objReturnAdd);

                            });

          }).bind({
                            church: church
                        });
		  });


	  };





this.addcampertodorm = function(res,req)
{
    var listC = req.body.listCamper;
    var objid = req.body.listid;
    var i =0;
    console.log('listC:'+JSON.stringify(listC));
    console.log('objid:'+objid);
            for ( i =0;i < listC.length; i++)
            {
                 console.log('loop:'+i);
               db.create('EDGE', 'dormCamperEdge').to('#'+objid).from(listC[i]['rid'].toString()).one()
                                    .then(function (edge) {

                                    });
             }

            res.send('Done');

 }



this.addSecurity = function(res,req)
{
    var camper = req.body;

    var i =0;
    console.log('camper:'+JSON.stringify(camper));
    console.log('camper[rid]:'+camper['rid']);
               db.create('EDGE', 'securityEdge').to('#18:0').from(camper['rid'].toString()).one()
                                    .then(function (edge) {
                                       res.send('Done');
                                    });
 }


this.addDormLeader = function(res,req)
{
    var camper = req.body;
    console.log('camper:'+JSON.stringify(camper));
    console.log('camper[dormid]:'+camper['dormid']);
    var i =0;
    console.log('camper:'+JSON.stringify(camper));
    console.log('camper[rid]:'+camper['rid']);
               db.create('EDGE', 'dormLeaderEdge').to(camper['dormid']).from(camper['rid'].toString()).one()
                                    .then(function (edge) {
                                       res.send('Done');
                                    });
 }


this.addCounceling = function(res,req)
{
    var camper = req.body;

    var i =0;
    console.log('camper:'+JSON.stringify(camper));
    console.log('camper[rid]:'+camper['rid']);

    if (camper['counsellevel'] == 1)
    {
        camper['counsellevel'] = "#45:0";
    }else  if (camper['counsellevel'] == 2)
    {
        camper['counsellevel'] = "#45:1";
    }else  if (camper['counsellevel'] == 3)
    {
        camper['counsellevel'] = "#45:2";
    }

               db.create('EDGE', 'counselingEdge').to(camper['counsellevel']).from(camper['rid'].toString()).one()
                                    .then(function (edge) {
                                       res.send('Done');
                                    });
 }




this.deletecampertodorm = function(res,req)
{
    var listC = req.body.listCamper;
    var objid = req.body.listid;
    var i =0;
    console.log('listC:'+JSON.stringify(listC));
    console.log('objid:'+objid);
            for ( i =0;i < listC.length; i++)
            {
                 console.log('loop:'+i);
               db.delete('EDGE', 'dormCamperEdge').to('#'+objid).from(listC[i]['rid'].toString()).one()
                                    .then(function (edge) {

                                    });
             }

             res.send('Done');

 }


    this.deleteCounceling = function(res,req)
    {
        var camper = req.body;

        console.log('req:'+ req.body);
        console.log('camper:'+JSON.stringify(camper));

        var i =0;
        console.log('camper:'+JSON.stringify(camper));
        console.log('camper[rid]:'+camper['rid']);

        if (camper['counsellevelold'] == 1)
        {
            camper['counsellevelold'] = "#45:0";
        }else  if (camper['counsellevelold'] == 2)
        {
            camper['counsellevelold'] = "#45:1";
        }else  if (camper['counsellevelold'] == 3)
        {
            camper['counsellevelold'] = "#45:2";
        }

        console.log('camper[rid]:'+camper['rid']);

        db.delete('EDGE', 'counselingEdge').to(camper['counsellevelold']).from(camper['rid'].toString()).one()
            .then(function (edge) {
                res.send('Done');
            });
    }

    this.deleteDormLeader = function(res,req)
    {
        var camper = req.body;

        console.log('req:'+ req.body);
        console.log('camper:'+JSON.stringify(camper));

        var i =0;
        console.log('camper:'+JSON.stringify(camper));
        console.log('camper[rid]:'+camper['rid']);
        db.delete('EDGE', 'dormLeaderEdge').to(camper['dormid']).from(camper['rid'].toString()).one()
            .then(function (edge) {
                res.send('Done');
            });
    }


    this.deleteSecurity = function(res,req)
    {
        var camper = req.body;

        console.log('req:'+ req.body);
        console.log('camper:'+JSON.stringify(camper));

        var i =0;
        console.log('camper:'+JSON.stringify(camper));
        console.log('camper[rid]:'+camper['rid']);
        db.delete('EDGE', 'securityEdge').to('#18:0').from(camper['rid'].toString()).one()
            .then(function (edge) {
                res.send('Done');
            });
    }



    this.update = function(res,req){
		  var ii=1;

		  console.log("reg.body:"+req.body);
			var idd = req.body['@rid'];
			console.log("idd:"+idd);
		   var obj=req.body;
			var updateString = 'gender = \''+obj.gender+'\',listnumber = \''+obj.listnumber+'\',dormname = \''+obj.dormname+'\'';


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

			db.delete('VERTEX').from('dormlist')
			.where('@rid = #'+req.params.id)
			.one()
			.then(function (objReturnDelete) {
			  console.log('Deleted', objReturnDelete, 'dormlist');
			  res.send('Deleted '+objReturnDelete + 'records');
			});
	  };


this.find = function(res,req)
	  {
		 db.select('@rid,gender,listid').from('dormlist').where('in(\'dormlistEdge\')[\'@rid\']=#'+req.params['id']).all()
			.then(function (objReturnFind) {
			  console.log('active users', objReturnFind);
			  res.send(objReturnFind);
		  });
	  };


this.camperNotInDorm = function(res,req)
	  {

        console.log('body'+JSON.stringify(req.body));
		console.log('id='+req.body.id);
        console.log('gender:' +req.body.gender);
        var idd = '#' + req.body.id;
        var gender = req.body.gender;
        console.log(idd);

         db.query('select @rid,firstname,lastname,dateofbirth,gender from (SELECT expand(in(\'churchmember\')) FROM ' + idd + ') where out(\'campyear\').size() > 0 and out(\'dormCamperEdge\').size() = 0 and gender=\''+gender+'\'')
                                        .then(function(persons) {
                                            res.send(persons);
                                        });
	  };


this.camperInDorm = function(res,req)
	  {

        var churchid = '#' + req.body.churchid;
        var dormid = req.body.dormid;
console.log('churchid='+churchid);
console.log('dormid='+dormid);

         db.query('select @rid,firstname,lastname,dateofbirth,gender,if(eval("out(\'counselingEdge\').size()>0"),out(\'counselingEdge\').level[0],0)  as counseling,out(\'securityEdge\').size() as security,out(\'dormLeaderEdge\').size() as dormLeader from (select expand(in(\'dormCamperEdge\')) from dormlist where @rid='+dormid+')')
                                        .then(function(persons) {
                                            res.send(persons);
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


  db.select('expand(out(dormlistEdge))').from('#'+req.params['id']).all()
         .then(function (objReturnFindAll) {
   		  console.log('active obj', objReturnFindAll);
	  	  res.send(objReturnFindAll);
		  });
	  };

this.findall = function(res,req)
	  {
		db.select().from('dormlist').all()
			.then(function (objReturnFindAll) {
			  console.log('active users', objReturnFindAll);
			  res.send(objReturnFindAll);
		  });
	  };
}

var dormlist = new DormList();

module.exports = dormlist;