"use strict";
var db = require("../orientDBConfig.js");

function search() {




this.find = function(res,req)
	  {

		  var searchtype = req.body.searchtype.searchtypename;
console.log("searchtype:"+searchtype );
		  if(searchtype.toLowerCase() == "first name")
		  {
			  search.findPerson(res,req,'firstname');
		  }else if(searchtype.toLowerCase() == "last name")
		  {
			  search.findPerson(res,req,'lastname');
		  }else if(searchtype.toLowerCase() == "ref number")
		  {
			  search.findPerson(res,req,'refnumber');
		  }
		  else if(searchtype.toLowerCase() == "church name")
		  {
			  search.findChurch(res,req,'churchname');
		  }else if(searchtype.toLowerCase() == "tshirts")
		  {
			  search.findtshirt(res,req,'tshirt');
		  }else if(searchtype.toLowerCase() == "transport")
		  {
			  search.findtransport(res,req,'transport');
		  }else if(searchtype.toLowerCase() == "tshirtstotals")
		  {
			  search.findTshirtTotals(res,req,'tshirtstotals');
		  }else if(searchtype.toLowerCase() == "transporttotals")
		  {
			  search.findtransportTotals(res,req,'transporttotals');
		  }else if(searchtype.toLowerCase() == "indeminity")
		  {
			  search.findindeminity(res,req,'indeminity');
		  }else if(searchtype.toLowerCase() == "dormlist")
		  {
			  search.findDormList(res,req,'dormlist');
		  }





	  };


	 this.findDormList = function(res,req,searchfilter)
	 {
		 db.select('firstname,lastname,out(\'dormCamperEdge\').gender[0] as gender,out(\'dormCamperEdge\').listid[0] as listid,out(\'dormCamperEdge\').dormname[0] as dormname,out(\'churchMember\').churchname[0] as church,if(eval("out(\'dormLeaderEdge\').size() == 1"),\'Y\',\' \') as dormleader').from("person").where('out(\'dormCamperEdge\').size()>0 and out(\'campyear\').size()>0').all()
			 .then(function (result) {
				 console.log("result records returned:" + result.length);
				 res.send(result);

				 //res.send(church);

			 });
	 }

 this.findindeminity= function(res,req,searchfilter)
	 {
		 db.select('count(*),church').from('select out(\'churchMember\').churchname[0] as church  from person where out(\'campyear\').size()>0 and out(\'docuploadEdge\').size() == 0').group('church').all()
			 .then(function (result) {
				 console.log("result records returned:" + result.length);
				 res.send(result);

				 //res.send(church);

			 });
	 }


	this.findChurch =function(res,req,searchfilter)
	{
		var searchvalue = req.body.search;
		var searchpar = '=';
		console.log("search value:"+search);

		if(searchvalue.indexOf('%') > 0)
		{
			searchpar = 'like'
		}


		db.select().from("church").where(searchfilter +' ' + searchpar+'\''+searchvalue+'\'').all()
			.then(function (result) {
				console.log("result:" + JSON.stringify(result));
				console.log("result records returned:" + result.length);


				res.send(result);

				//res.send(church);

			});

	}

this.findPerson =function(res,req,searchfilter)
	{
		var searchvalue = req.body.search;
		var searchpar = '=';
		console.log("search value:"+search);

		if(searchvalue.indexOf('%') > 0)
		{
			searchpar = 'like'
		}


		db.select('@rid,firstname,lastname,email,refnumber,gender, out(\'churchMember\').churchname[0] as church').from("person").where(searchfilter +' ' + searchpar+'\''+searchvalue+'\' and out(\'campyear\').size()>0').all()
			.then(function (camper) {
				console.log("camper:" + JSON.stringify(camper));
				console.log("camper records returned:" + camper.length);
				var camperArray =[];
				var personFind = {
				};
				var i =0;
				for (i=0;i<camper.length;i++) {

					personFind = {};
					personFind.rid = camper[i]['@rid'];
					personFind.firstname = camper[i].firstname;
					personFind.church = camper[i].church;
					personFind.lastname = camper[i].lastname;
					personFind.email = camper[i].email;
					personFind.refnumber = camper[i].refnumber;
					personFind.gender = camper[i].gender;
					camperArray.push(personFind);

				}

				res.send(camperArray);

				//res.send(church);

			});

	}

this.findtshirt =function(res,req,searchfilter)
	{
		
		db.select('@rid,firstname,lastname,email,refnumber,gender, out(\'churchMember\').churchname[0] as church,out(\'tshirtEdge\').size[0] as tshirtsize ').from("person").where('out(\'campyear\').size()>0 and out(\'tshirtEdge\').size()>0').all()
			.then(function (camper) {
				console.log("camper:" + JSON.stringify(camper));
				console.log("camper records returned:" + camper.length);
				var camperArray =[];
				var personFind = {
				};
				var i =0;
				for (i=0;i<camper.length;i++) {

					personFind = {};
					personFind.rid = camper[i]['@rid'];
					personFind.firstname = camper[i].firstname;
					personFind.lastname = camper[i].lastname;
                                   personFind.church= camper[i].church;
					personFind.tshirtsize = camper[i].tshirtsize;
					personFind.gender = camper[i].gender;
					
					personFind.refnumber = camper[i].refnumber;
					
					camperArray.push(personFind);

				}

				res.send(camperArray);

				//res.send(church);

			});

	}

this.findTshirtTotals = function(res,req,searchfilter)
{
    

		db.select('count(*),church').from("select  out('churchMember').churchname[0] as church from person where out('campyear').size()>0 and out('tshirtEdge').size()>0").group("church").all()
			.then(function (totals) {		
				res.send(totals);
			});
}
    

    this.findtransportTotals = function(res,req,searchfilter)
{
    

		db.select('count(*),church').from("select  out('churchMember').churchname[0] as church from person where out('campyear').size()>0 and out('transportEdge').size()>0").group("church").all()
			.then(function (totals) {		
				res.send(totals);
			});
}



this.findtransport =function(res,req,searchfilter)
	{
		
		db.select('@rid,firstname,lastname,email,refnumber,gender,contactno[0].cell as cell, out(\'churchMember\').churchname[0] as church,out(\'transportEdge\').location[0] as location').from("person").where('out(\'campyear\').size()>0 and  out(\'transportEdge\').size()>0').all()
			.then(function (camper) {
				console.log("camper:" + JSON.stringify(camper));
				console.log("camper records returned:" + camper.length);
				var camperArray =[];
				var personFind = {
				};
				var i =0;
				for (i=0;i<camper.length;i++) {

					personFind = {};
					personFind.rid = camper[i]['@rid'];
					personFind.firstname = camper[i].firstname;
					personFind.lastname = camper[i].lastname;
					personFind.email = camper[i].email;
                                        personFind.cell = camper[i].cell;
					personFind.refnumber = camper[i].refnumber;
					personFind.gender = camper[i].gender;
					personFind.location = camper[i].location ;
					personFind.church = camper[i].church;


					camperArray.push(personFind);

				}

				res.send(camperArray);

				//res.send(church);

			});

	}



}
 
var search = new search();

module.exports = search;