"use strict";

var db = require("../orientDBConfig.js");

function Province() {
	
	  
	  this.add = function(res,req){
		  var ii=0;
		  ii=1;
		
		  
		     db.insert().into('province').set(req.body.province).one()
			.then(function (province) {
				console.log('created', province);
				return province;
				//return company
			  
			}).then(function(province)
			{
				res.send(province);
			});
	  };
	  
	  
	  
	  this.update = function(res,req){
		  var ii=0;
		  ii=1;
		 // db.insert().into('Company').set({companyReg: company.companyReg,organizationName:'organizationName', country: 'country', email: 'email', phoneNo: 'phoneNo', physicalAddress: 'physicalAddress', postalAddress: 'postalAddress', postalCode: '175', vatNo: 'vatNo', website: 'website'}).one()
			
		  console.log("reg.body:"+req.body);
			var idd = req.body['@rid'];
			delete req.body['@rid'];
			
			db.update('province').set(req.body).where('@rid = "'+idd+'"').scalar()
				.then(function (total) {
				  console.log('updated', total, 'provinces');
				  res.send('updated', total, 'provinces');
				});
	  };
	  
	  
	  this.deleteRecord = function(res,req){
		  var ii=0;
		  ii=1;
		 // db.insert().into('Company').set({companyReg: company.companyReg,organizationName:'organizationName', country: 'country', email: 'email', phoneNo: 'phoneNo', physicalAddress: 'physicalAddress', postalAddress: 'postalAddress', postalCode: '175', vatNo: 'vatNo', website: 'website'}).one()
			
			console.log("reg.body:"+req.params.id);
			
			db.delete('VERTEX').from('province')
			.where('@rid = #'+req.params.id)
			.one()
			.then(function (total) {
			  console.log('deleted', total, 'province');
			  res.send('Deleted '+total + ' province');
			});
		  
		  
		  
	  };
	  
	  
	  
	  this.findall = function(res,req)
	  {		  
		  db.select().from('province').all()
			.then(function (provinceList) {
			  console.log('active users', provinceList);
			  res.send(provinceList);
		  });
	  };
	  
	  
	  
	  
  
}

var province = new Province();

module.exports = province;














