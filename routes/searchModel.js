"use strict";
var db = require("../orientDBConfig.js");

function search() {




this.find = function(res,req)
	  {

		  var searchtype = req.body.searchtype.searchtypename;
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
		  }



	  };


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


		db.select().from("person").where(searchfilter +' ' + searchpar+'\''+searchvalue+'\'').all()
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
					personFind.refnumber = camper[i].refnumber;
					personFind.gender = camper[i].gender;
					camperArray.push(personFind);

				}

				res.send(camperArray);

				//res.send(church);

			});

	}



}
 
var search = new search();

module.exports = search;