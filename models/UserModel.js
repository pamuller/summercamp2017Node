
var db = require("../orientDBConfig.js");
//var companyuser= require("../models/CompanyUserModel");

function Person() {
	  
	  this.add = function(res,person){
		  var ii=0;
		  ii=1;
		 // db.insert().into('Company').set({companyReg: company.companyReg,organizationName:'organizationName', country: 'country', email: 'email', phoneNo: 'phoneNo', physicalAddress: 'physicalAddress', postalAddress: 'postalAddress', postalCode: '175', vatNo: 'vatNo', website: 'website'}).one()
			
		  db.insert().into('OUser').set(person).one()
			.then(function (company) {
				console.log('created', person);
				res.send(person);
				//return company
			  
			});
		  
	  };
	  
	  
	  this.addPerson = function(res,req,personSingle,obj){
		  var ii=0;
		  ii=1;
		  //var personSingle = {};
		 // db.insert().into('Company').set({companyReg: company.companyReg,organizationName:'organizationName', country: 'country', email: 'email', phoneNo: 'phoneNo', physicalAddress: 'physicalAddress', postalAddress: 'postalAddress', postalCode: '175', vatNo: 'vatNo', website: 'website'}).one()
			
		  db.insert().into('OUser').set(personSingle).one()
			.then(function (personSingle) {
				
				console.log('created addPerson', personSingle);
				obj.addCompanyUser(req.body.company,personSingle);
				res.send(personSingle);
				//res.send(person);
			},function(reason){
				console.log("Error Reason:"+reason);
				
			});
		  
		  //return personSingle;
	  };
	  
	  
	  
	  this.findall = function(res)
	  {
		  db.select().from('OUser').all()
			.then(function (persons) {
			  console.log('active users', persons);
			  res.send(persons);
		  });
	  };
    
    
      
    

}

var person = new Person();

module.exports = person;



