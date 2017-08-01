var db = require("../orientDBConfig.js");
var nodemailer = require('nodemailer');
var storeDoc = require('../models/storeDocModel');
//var companyuser= require("../models/CompanyUserModel");

function UserRegister() {


    var referNoCount = 0;
    var personFind = {};


    this.sendEmailDoc = function (req, res) {
        userRegister.sendEmail(req.body);
    }




    this.sendEmail = function (person,campcode) {
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

        var mailOptions = {};

        console.log('campcode:'+campcode);

        if (campcode == 'ya')
        {
			mailOptions = {
			            from: 'ya@waterkloofbaptist.org.za', // sender address
			            to: person.email, // list of receivers
			            bcc: 'pamuller@waps.co.za', // list of receivers
			            subject: 'Connect Camp Registration : ' + person.refnumber, // Subject line

			            html: {
			                path: './mailfiles/Dear Connect Camper Letter 2017.html'
			            },

			            attachments: [
			                { // utf-8 string as an attachment
			                    filename: 'Indemnity Form Connect 2017.pdf'
			                    , path: './mailfiles/Indemnity Form Connect 2017.pdf'
			                }]
        			};

		}else
		{

			mailOptions = {
			            from: 'summercamp@waterkloofbaptist.org.za', // sender address
			            to: person.email, // list of receivers
			            bcc: 'pamuller@waps.co.za', // list of receivers
			            subject: 'Summercamp Registration : ' + person.refnumber, // Subject line

			            html: {
			                path: './mailfiles/Dear Camper Letter 2016.html'
			            },

			            attachments: [
			                { // utf-8 string as an attachment
			                    filename: 'Indemnity Form 2016.pdf'
			                    , path: './mailfiles/Indemnity Form 2016.pdf'
			                }
			                , { // binary buffer as an attachment
			                    filename: 'Dear Camper Letter 2016.pdf'
			                    , path: './mailfiles/Dear Camper Letter 2016.pdf'
			                }]
        };

		}







        // send mail with defined transport object
        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                return console.log(error);
            }
            console.log('Message sent: ' + info.response);
        });

    }


    this.checkReferenceNumber = function (req, res) {

        var church = req.req.body.church;
        var pos1 = req.req.body.church['@rid'].indexOf(':');
        var churchid = req.req.body.church['@rid'].substring(pos1 + 1, req.req.body.church['@rid'].length);
        var refnumber = 'YA' +churchid + '16' + (Math.floor(Math.random() * 999));

        console.log('refnumber=' + refnumber);

        db.select().from('Person').where('refnumber=\'' + refnumber + '\'').all()
            .then(function (camper) {
                console.log(camper.length);
                if (camper.length == 0) {
                    //req.req.body.user.refnumber=refnumber;

                    console.log('refnumber3=' + this.refnumber);
                    userRegister.checkExist(req, res, this.refnumber);


                } else {
                    referNoCount++;
                    if (referNoCount > 10) {
                        console.log("ReferenceNumber could not be created")
                    } else {
                        var refnumber = churchid + +'16' + (Math.floor(Math.random() * 999));
                        userRegister.checkReferenceNumber(req, res);
                    }
                }

            }.bind({
                refnumber: refnumber
            }));

    }

    this.add = function (req, res) {

        userRegister.checkReferenceNumber(req, res);

    }


    this.registrationCount = function (req, res) {
        
        console.log('campid:'+req.params.id);
        
       db.select('count(*)').from('person').where('out(\'campyear\')[@rid]=#'+req.params.id).all()
            .then(function (registerCount) {
                console.log('registrationCount=', registerCount);
                res.send(registerCount);
            });  
        

       /* db.select('count(*)').from('person').where('out(\'campyear\').size() > 0').all()
            .then(function (registerCount) {
                console.log('registrationCount=', registerCount);
                res.send(registerCount);
            });*/

    }


    this.registrationCountByChurch = function (req, res) {

        console.log('campid:'+req.params.id);
      /*  db.select('count(churchname),churchname').from('(select out(\'churchMember\').churchname as churchname from person where out(\'campyear\').size() > 0 )').group('churchname').all()
            .then(function (registerCount) {
                console.log('registrationCount=', registerCount);
                res.send(registerCount);
            });*/

        db.select('count(churchname),churchname,sum(doccount) as doccount,sum(paid) as paid').from('select out(\'churchMember\').churchname as churchname, if(eval("out(\'docuploadEdge\').size() >= 1"),1,0) as doccount,if(eval("out(\'paymentMade\').size() > 0"),out(\'paymentMade\').paymentamount,0) as paid  from person where out(\'campyear\')[@rid]=#'+req.params.id).group('churchname').all()
            .then(function (registerCount) {
                console.log('registrationCount=', registerCount);
                res.send(registerCount);
            });



    }


    this.countTshirst = function (req, res) {

        db.select('count(*),size').from('(select out(\'tshirtEdge\').size as size from person where out(\'campyear\').size() > 0 and out(\'tshirtEdge\').size() > 0)').group('size').all()
            .then(function (tshirtCount) {
                console.log('tshirtCount=', tshirtCount);
                res.send(tshirtCount);
            });

    }


    this.countTransPort = function (req, res) {

        db.select('count(*),location').from('(select out(\'transportEdge\').location as location from person where out(\'campyear\').size() > 0 and out(\'transportEdge\').size() > 0)').group('location').all()
            .then(function (tshirtCount) {
                console.log('tshirtCount=', tshirtCount);
                res.send(tshirtCount);
            });

    }

    this.getCamperInfo = function (req, res, vm) {

        console.log("camperid:" + req.params['id'])
        var personid = ("#" + req.params['id']);
        console.log("personid:" + personid);
        db.select().from(personid).all()
            .then(function (camper) {
                console.log("camper:" + camper);
                var personFind = {
                    "user": {}
                };
                personFind.user.rid = camper[0]['@rid'];
                personFind.user.firstname = camper[0].firstname;
                personFind.user.email = camper[0].email;
                personFind.user.lastname = camper[0].lastname;
                personFind.user.refnumber = camper[0].refnumber;
                personFind.user.gender = camper[0].gender;
                personFind.user.dateofbirth = camper[0].dateofbirth;
                personFind.user.contactno = camper[0].contactno;

                //res.send(church);
                userRegister.getAddressInfo(req, res, personFind, camper);
            }.bind({
                personFind: personFind
            }));
    }



    this.getAddressInfo = function (req, res, personFind, camper) {
        console.log("getAddressInfo:");
        var addressedge = camper[0].out_addressEdge;
        console.log("addressedge :" + JSON.stringify(addressedge));
        //console.log("camperid:"+camperid['_content']);
        // console.log("JSON.stringify(camperid):"+ JSON.stringify(camperid));

        /* for(var key in camperid) {
            var value = camperid[key];
                console.log("key:"+key +";value:"+value);
        }*/


        console.log("Addressid:" + addressedge['_content']);
        db.select('expand(in)').from(addressedge['_content']).all()
            .then(function (addressinfo) {
                console.log("getAddressInfo got:");
                personFind.addressinfo = {};
                personFind.addressinfo.rid = addressinfo[0]['@rid'];
                personFind.addressinfo.postalcode = addressinfo[0].postalcode;
                personFind.addressinfo.physicaladdress = addressinfo[0].physicaladdress;
                personFind.addressinfo.postaladdress = addressinfo[0].postaladdress;
                userRegister.getTshirtInfo(req, res, personFind, camper);
            });
    }


    this.getTshirtInfo = function (req, res, personFind, camper) {
        console.log("getTshirtInfo:");
        if (camper[0].out_tshirtEdge != null) {
            var tshirtid = camper[0].out_tshirtEdge;
            console.log('tshirtid:' + JSON.stringify(tshirtid));
            db.select('expand(in)').from(tshirtid['_content']).all()
                .then(function (tshirtinfo) {
                    personFind.tshirt = {};
                    if (tshirtinfo.length == 0) {
                        personFind.tshirt.required = false;

                    } else {
                        personFind.tshirt.required = true;
                        personFind.tshirt.rid = tshirtinfo[0]['@rid'];
                        personFind.tshirt.size = tshirtinfo[0].size;
                        personFind.tshirt.edge = tshirtid['_content'];
                    }

                    userRegister.getTransportInfo(req, res, personFind, camper);
                });
        } else {
            userRegister.getTransportInfo(req, res, personFind, camper);
        }
    }

    this.getTransportInfo = function (req, res, personFind, camper) {
        console.log("getTransportInfo:");
        if (camper[0].out_transportEdge != null) {
            var transportid = camper[0].out_transportEdge;
            console.log('transportid:' + JSON.stringify(transportid));
            db.select('expand(in)').from(transportid['_content']).all()
                .then(function (transportinfo) {
                    console.log('transportinfo return db:' + JSON.stringify(transportinfo));

                    if (transportinfo.length == 0) {
                        personFind.transport = {};
                        personFind.transport.required = false;

                        userRegister.getperantGardiansInfo(req, res, personFind, camper);
                    } else {
                        personFind.transport = {};
                        personFind.transport.required = true;
                        personFind.transport.rid = transportinfo[0]['@rid'];
                        personFind.transport.from = transportinfo[0].location;
                        userRegister.getperantGardiansInfo(req, res, personFind, camper);

                    }

                });
        } else {
            userRegister.getperantGardiansInfo(req, res, personFind, camper);
        }
    }


    this.getperantGardiansInfo = function (req, res, personFind, camper) {
        console.log("getperantGardiansInfo:");
        var i = 0;
        // var parent = camper[0].out_parent['all'];
        var parent = camper[0].out_parent;
        console.log('JSON.stringify(parent):' + JSON.stringify(parent));
        var parentlistid = "";
        for (i; i < parent['_content'].length; i++) {
            console.log("perantGardiansInfo:" + i);
            parentlistid = parentlistid + parent['_content'][i] + ",";
            console.log("parentlistid:" + parentlistid);
        }

        var listid = parentlistid.substring(0, parentlistid.toString().length - 1);
        console.log("pt1:" + listid);
        db.select('expand(in)').from('[' + listid + ']').all()
            .then(function (parentinfo) {
                personFind.perantGardians = [];
                console.log(JSON.stringify(parentinfo));

                var i = 0;
                console.log("parentinfo length" + parentinfo.length);
                for (i; i < parentinfo.length; i++) {
                    var parent = {};

                    parent.rid = parentinfo[i]['@rid'];
                    parent.firstname = parentinfo[i].firstname;
                    parent.lastname = parentinfo[i].lastname;
                    parent.relation = parentinfo[i].relation;
                    parent.contactdetails = parentinfo[i].contactdetails;
                    personFind.perantGardians.push(parent);
                }

                userRegister.getMedicalinfoInfo(req, res, personFind, camper)


            });



    }

    this.getMedicalinfoInfo = function (req, res, personFind, camper) {
        console.log("getMedicalinfoInfo:");
        if (camper[0].out_medicalInfoEdge != null) {
            console.log("got MedicalinfoInfo:");
            var medicalinfoid = camper[0].out_medicalInfoEdge;
            console.log("medicalinfoid:" + JSON.stringify(medicalinfoid));
            db.select('expand(in)').from(medicalinfoid['_content']).all()
                .then(function (medicalinfoinfo) {
                    console.log("medicalinfoinfo return:" + JSON.stringify(medicalinfoinfo));
                    personFind.medicalinfo = {};
                    personFind.medicalinfo = medicalinfoinfo



                    // personFind.medicalinfo.allergies = medicalinfoinfo.allergies;
                    //personFind.medicalinfo.histories = medicalinfoinfo.histories;
                    // personFind.medicalinfo.medications = medicalinfoinfo.medications;

                    userRegister.getMedicalaidinfo(req, res, personFind, camper);
                });
        } else {
            userRegister.getMedicalaidinfo(req, res, personFind, camper);
        }
    }


    this.getMedicalaidinfo = function (req, res, personFind, camper) {
        console.log("getMedicalaidinfo:")
        if (camper[0].out_medicalaidinfoEdge != null) {
            console.log("got Medicalaidinfo:")
            var medicalaidid = camper[0].out_medicalaidinfoEdge;
            console.log("medicalaidid:" + JSON.stringify(medicalaidid));
            db.select('expand(in)').from(medicalaidid['_content']).all()
                .then(function (medicalaidinfo) {
                    console.log("medicalaidid return :" + JSON.stringify(medicalaidinfo));
                    personFind.medicalaidinfo = {};
                    personFind.medicalaidinfo.hasmedicalAid = medicalaidinfo[0].hasmedicalAid;
                    if (medicalaidinfo[0].hasmedicalAid) {
                        personFind.medicalaidinfo = medicalaidinfo;

                    }
                    userRegister.getOtherinfoInfo(req, res, personFind, camper);
                });
        } else {
            userRegister.getOtherinfoInfo(req, res, personFind, camper);
        }
    }


    this.getOtherinfoInfo = function (req, res, personFind, camper) {
        console.log("getOtherinfoInfo:")
        if (camper[0].out_otherEdge != null) {
            var otherinfoid = camper[0].out_otherEdge;
            console.log("otherinfoid:" + JSON.stringify(otherinfoid));
            db.select('expand(in)').from(otherinfoid['_content']).all()
                .then(function (otherinfoinfo) {
                    console.log("otherinfoinfo db:" + JSON.stringify(otherinfoinfo));
                    personFind.otherinfo = {};
                    personFind.otherinfo.otherinfo = otherinfoinfo[0].otherinfo;
                    personFind.otherinfo.rid = otherinfoinfo[0]['@rid'];
                    res.send(personFind);
                });
        } else {
            res.send(personFind);
        }
    }


    this.checkExist = function (req, res, refnumber) {


        db.select('count(*)').from('person').where('out(\'campyear\').size() >0 and email=\'' + req.req.body.user.email + '\'').all()
            .then(function (camperCount) {
                console.log('camperCount=', camperCount[0].count);
                userRegister.addCamper(req, res, this.refnumber);
                /* if(camperCount[0].count == 0)
                     {
                         userRegister.addCamper(req,res,this.refnumber);
                     }else{
                          console.log("res2:"+res);
                        res.res.status(503);
                         res.res.send({ error: 'Camper allready exist!' });

                     }   */
            }.bind({
                refnumber: refnumber
            }));
    }



    this.addCamper = function (req, res, refnumber) {

        console.log("************ add camper *****************************");
        var vm = this;
        var ii = 0;
        ii = 1;
        //add person
        var person = req.req.body.user;
        var church = req.req.body.church;
        var campcode = req.req.body.camp;
        person.contactno = [{
            'cell': person.contactno
        }];
        person.refnumber = refnumber;

        console.log("person.refnumber=" + refnumber);
        console.log("person.refnumber=" + person.refnumber);

        db.insert().into('Person').set(person).one()
            .then(function (person) {
                console.log('created', person);
                var userid = person['@rid'];
                if (church['@rid'] != '#0:0') {
                    db.create('EDGE', 'churchMember').to(church['@rid'].toString()).from(userid).one()
                        .then(function (edge) {
                            // res.send(req.body.person);
                            console.log('created addressEdge');
                            //create edge to summercamp2016
                            db.create('EDGE', 'campyear').to(campcode).from(userid).one()
                                .then(function (edge) {
                                    // res.send(req.body.person);
                                    console.log('created addressEdge');
                                    vm.addressinfo(person, req, res, vm);
                                });
                        });

                } else {
                    vm.addressinfo(person, req, res, vm);
                }

            });
    };


    this.addressinfo = function (person, req, res, vm) {
        var addressinfo = req.req.body.addressinfo;
        var userid = person['@rid'];
        db.insert().into('addressinfo').set(addressinfo).one()
            .then(function (addressinfo) {
                console.log('created', addressinfo);
                //add edge
                db.create('EDGE', 'addressEdge').to(addressinfo['@rid'].toString()).from(userid).one()
                    .then(function (edge) {
                        // res.send(req.body.person);
                        console.log('created addressEdge');
                        vm.parent1(person, req, res, vm);
                    });


            });
    }




    this.parent1 = function (person, req, res, vm) {
        console.log('parent');
        var parentArray = req.req.body.perantGardians;
        var i = 0;
        for (i = 0; i < parentArray.length; i++) {

            var parent1 = parentArray[i];
            console.log('parent1:' + parent1);
            var userid = person['@rid'];
            db.insert().into('person').set(parent1).one()
                .then(function (parent1) {
                    console.log('created', parent1);
                    //res.send(person);

                    db.create('EDGE', 'parent').set({
                            relation: parent1.relation
                        }).to(parent1['@rid'].toString()).from(userid).one()
                        .then(function (edge) {
                            // res.send(req.body.person);
                            console.log('created parentEdge');

                        });



                });

        }
        vm.tshirt(person, req, res, vm);
        // vm.emergancy1(person,req,res,vm);
    }

    this.parent2 = function (person, req, res, vm) {
        console.log('parent');
        var parent2 = req.req.body.parent2;
        var userid = person['@rid'];

        db.insert().into('person').set(parent2).one()
            .then(function (parent2) {
                console.log('created', parent2);
                //res.send(person);
                //return company
                db.create('EDGE', 'parent').set({
                        relation: parent2.relation
                    }).to(parent2['@rid'].toString()).from(userid).one()
                    .then(function (edge) {
                        // res.send(req.body.person);
                        console.log('created addressEdge');
                        // vm.tshirt(person,req,res,vm);
                        vm.emergancy1(person, req, res, vm);

                    });
            });
    }

    this.emergancy1 = function (person, req, res, vm) {
        var emergancy1 = req.req.body.emergency1;
        var userid = person['@rid'];
        db.insert().into('person').set(emergancy1).one()
            .then(function (emergancy1) {
                console.log('created', emergancy1);
                //res.send(person);
                //return company
                db.create('EDGE', 'EmergencyContact').to(emergancy1['@rid'].toString()).from(userid).one()
                    .then(function (edge) {
                        // res.send(req.body.person);
                        console.log('created addressEdge');
                        vm.emergancy2(person, req, res, vm);
                    });

            });
    }

    this.emergancy2 = function (person, req, res, vm) {
        var emergancy2 = req.req.body.emergency2;
        var userid = person['@rid'];
        db.insert().into('person').set(emergancy2).one()
            .then(function (emergancy2) {
                console.log('created', emergancy2);
                //res.send(person);
                //return company

                db.create('EDGE', 'EmergencyContact').to(emergancy2['@rid'].toString()).from(userid).one()
                    .then(function (edge) {
                        // res.send(req.body.person);
                        console.log('created addressEdge');
                        vm.tshirt(person, req, res, vm);
                    });

            });
    }



    //add tshirt
    this.tshirt = function (person, req, res, vm) {
        console.log("create tshirt");

        if (req.req.body.tshirt.required == true) {
            var userid = person['@rid'];
            //res.send(person);
            //return company
            db.create('EDGE', 'tshirtEdge').to(req.req.body.tshirt.size).from(userid).one()
                .then(function (edge) {
                    // res.send(req.body.person);
                    console.log('created tshirtEdge');
                    vm.transport(person, req, res, vm);
                });
        } else {
            vm.transport(person, req, res, vm);
        }




    }

    //add transport

    this.transport = function (person, req, res, vm) {
        var transport = req.req.body.transport;
        var userid = person['@rid'];

        if (req.req.body.transport.required == true) {
            //res.send(person);
            //return company
            db.create('EDGE', 'transportEdge').to(transport.from).from(userid).one()
                .then(function (edge) {
                    // res.send(req.body.person);
                    console.log('created transportEdge');
                    vm.medicalinfo(person, req, res, vm);
                });
        } else {
            vm.medicalinfo(person, req, res, vm);
        }


    }

    //add medicalinfo
    this.medicalinfo = function (person, req, res, vm) {
        var medicalinfo = req.req.body.medicalinfo;
        var userid = person['@rid'];
        db.insert().into('medicalinfo').set(medicalinfo).one()
            .then(function (medicalinfo) {
                console.log('created', medicalinfo);
                //res.send(person);
                //return company
                db.create('EDGE', 'medicalInfoEdge').to(medicalinfo['@rid'].toString()).from(userid).one()
                    .then(function (edge) {
                        // res.send(req.body.person);
                        console.log('created medicalInfoEdge');
                        vm.medicalaidinfo(person, req, res, vm);
                    });

            });
    }


    //add medicalaidinfo
    this.medicalaidinfo = function (person, req, res, vm) {
        console.log("andrew:" + req.req.body.medicalaidinfo);
        console.log("andrew:" + (req.req.body.medicalaidinfo == undefined));
        if (req.req.body.medicalaidinfo == undefined) {
            var medicalaidinfo = {};
            medicalaidinfo.hasmedicalAid = 'false';
        } else {
            var medicalaidinfo = req.req.body.medicalaidinfo;
        }



        var userid = person['@rid'];
        db.insert().into('MedicalAidInformation').set(medicalaidinfo).one()
            .then(function (medicalaidinfo) {
                console.log('created', medicalaidinfo);
                //res.send(person);
                //return company
                if (medicalaidinfo['@rid'] != undefined) {
                    db.create('EDGE', 'medicalaidinfoEdge').to(medicalaidinfo['@rid'].toString()).from(userid).one()
                        .then(function (edge) {
                            // res.send(req.body.person);
                            console.log('created medicalaidinfoEdge');
                            vm.otherinfo(person, req, res, vm);
                        });
                }
            });
    }

    //add other

    this.otherinfo = function (person, req, res, vm) {
        console.log("otherinfo:");
        //console.log("otherinfo1:"+req.req.body.otherinfo);
        if (req.req.body.otherinfo != undefined) {
            var otherinfo = req.req.body.otherinfo;
            var userid = person['@rid'];
            db.insert().into('otherinfo').set(otherinfo).one()
                .then(function (otherinfo) {
                    console.log('created', otherinfo);
                    //res.send(person);
                    //return company
                    db.create('EDGE', 'otherEdge').to(otherinfo['@rid'].toString()).from(userid).one()
                        .then(function (edge) {
                            // res.send(req.body.person);
                            //console.log('created otherEdge');


                            userRegister.sendEmail(person,'ya');

                            res.res.send(person);

                        });

                });
        } else {
            userRegister.sendEmail(person,'ya');
            res.res.send(person);
        }
    }


    this.addPerson = function (res, req, personSingle, obj) {
        var ii = 0;
        ii = 1;
        //var personSingle = {};
        // db.insert().into('Company').set({companyReg: company.companyReg,organizationName:'organizationName', country: 'country', email: 'email', phoneNo: 'phoneNo', physicalAddress: 'physicalAddress', postalAddress: 'postalAddress', postalCode: '175', vatNo: 'vatNo', website: 'website'}).one()

        db.insert().into('OUser').set(personSingle).one()
            .then(function (personSingle) {

                console.log('created addPerson', personSingle);
                obj.addCompanyUser(req.body.company, personSingle);
                res.send(personSingle);
                //res.send(person);
            }, function (reason) {
                console.log("Error Reason:" + reason);

            });

        //return personSingle;
    };



    this.findall = function (res) {
        db.select().from('OUser').all()
            .then(function (persons) {
                console.log('active users', persons);
                res.send(persons);
            });
    };


    this.findParent = function (req, res) {
        db.select().from('#' + req.body).all()
            .then(function (persons) {
                console.log('active users', persons);
                res.send(persons);
            });
    };


      this.transportList = function (req, res) {
          console.log('location:'+req.params.location);
        db.select(' firstname,lastname,refnumber,out(\'churchMember\').churchname[0]').from('person').where('out(\'transportEdge\').location[0]=\''+req.params.location+'\'').all()
            .then(function (persons) {
                console.log('active users', persons);
                res.send(persons);
            });
    };


    this.findByChurch = function (req, res) {

        console.log(req.params.id);
        var idd = '#' + req.params.id;
        console.log(idd);
        db.select('@rid,email,lastname,out(\'churchMember\').churchname as churchname,dateofbirth,gender,refnumber,firstname,contactno,out(\'parent\').asList() as parentinfo,out(\'medicalInfoEdge\').allergies as allergies,out(\'medicalInfoEdge\').histories as histories,out(\'medicalInfoEdge\').medications as medications,out(\'medicalaidinfoEdge\').MedicalAidNo as MedicalAidNo,out(\'medicalaidinfoEdge\').MedicalAidName as MedicalAidName,out(\'medicalaidinfoEdge\').RelationToCamper as RelationToCamper,out(\'medicalaidinfoEdge\').MainMemberName as MainMemberName,out(\'medicalaidinfoEdge\').MedicalPlan as MedicalPlan,out(\'medicalaidinfoEdge\').hasmedicalAid as hasmedicalAid,out(\'otherEdge\').otherinfo as otherinfo,out(\'addressEdge\').postaladdress[0] as postaladdress,out(\'addressEdge\').physicaladdress[0] as physicaladdress,out(\'addressEdge\').postalcode[0] as postalcode,out(\'transportEdge\').location[0] as transport,out(\'tshirtEdge\').size[0] as tshirt,out(\'parent\') , out(\'docuploadEdge\').size() as doccount').from('(SELECT expand(in(\'churchmember\')) FROM ' + idd + ')').where('out(\'campyear\').size() > 0').all()
            .then(function (persons) {
                console.log('active users', persons);



                res.send(persons);
            });
    };

    this.downloadDoc = function (req, res) {
        console.log(req.params.id);
        var idd = '#' + req.params.id;
        console.log("#idd" + idd);
        db.select('out(\'docuploadEdge\').filename[0] as filename').from(idd).all()
            .then(function (doclink) {
                console.log('doclink', JSON.stringify(doclink));
                console.log('doclink filename', doclink[0].filename);
                storeDoc.downloadFile(req, res, doclink[0].filename);
                // res.send(persons);
            });
    }


    this.findCampersSmallByChurch = function (req, res) {

        console.log(req.params.id);
        
        var posS = req.params.id.toString().indexOf('_')
        
        var campid ='#' +  req.params.id.toString().substr(posS+1, req.params.id.toString().length);
        
        console.log('campid:'+campid);
        
        var idd = '#' + req.params.id.toString().substr(0, posS);;
        console.log('idd:'+idd);


         db.query('select rid,email,lastname,dateofbirth,gender,refnumber,firstname,contactno,doccount,paid,toPay,eval(\'paid.asDecimal() / toPay.asDecimal() * 100\') as pers,tshirt, transport from (select @rid,email,lastname,dateofbirth,gender,refnumber,firstname,contactno, out(\'docuploadEdge\').size() as doccount,if(eval("out(\'paymentMade\').size() > 0"),sum(out(\'paymentMade\').paymentamount),0) as paid ,sum(out(\'tshirtEdge\').cost[0].asInteger(),if(eval(\"out(\'transportEdge\').size() > 0\"), out(\'transportEdge\').cost[0], 0).asInteger() ,850) as toPay,out(\'tshirtEdge\').size() as tshirt,out(\'transportEdge\').size() as transport  from (SELECT expand(in(\'churchmember\')) FROM '+idd+') where out(\'campyear\')[@rid]='+campid+' group by @rid)')
                                        .then(function(persons) {
 				console.log('persons', persons);

                                            res.send(persons);
                                        });
    };



        this.findCampersSmallByChurchCode = function (req, res) {

        console.log(req.params.id);
       // var idd = '#12:'+req.params.id;
        //console.log(idd);
            
            
         var posS = req.params.id.toString().indexOf('_')
        
        var campid ='#' +  req.params.id.toString().substr(posS+1, req.params.id.toString().length);
        
        console.log('campid:'+campid);
        
        var idd = '#12' + req.params.id.toString().substr(0, posS);;
        console.log('idd:'+idd);    
            

         db.query('select rid,email,lastname,dateofbirth,gender,refnumber,firstname,contactno,doccount,paid,toPay,eval(\'paid.asDecimal() / toPay.asDecimal() * 100\') as pers,tshirt, transport from (select @rid,email,lastname,dateofbirth,gender,refnumber,firstname,contactno, out(\'docuploadEdge\').size() as doccount,if(eval("out(\'paymentMade\').size() > 0"),sum(out(\'paymentMade\').paymentamount),0) as paid ,sum(out(\'tshirtEdge\').cost[0].asInteger(),if(eval(\"out(\'transportEdge\').size() > 0\"), out(\'transportEdge\').cost[0], 0).asInteger() ,850) as toPay,out(\'tshirtEdge\').size() as tshirt,out(\'transportEdge\').size() as transport  from (SELECT expand(in(\'churchmember\')) FROM '+idd+') where out(\'campyear\')[@rid]='+campid+' group by @rid)')
                                        .then(function(persons) {
 				console.log('persons', persons);

                                            res.send(persons);
                                        });
    };


    this.update = function (req, res) {
        console.log('update');
        userRegister.updateCamperInfo(req, res);
        /* var idd= '#'+req.params.id;
        db.select('out(\'docuploadEdge\').filename').from(idd).all()
			.then(function (doclink) {
			  console.log('active users', persons);



			  res.send(persons);
		  });*/
    }

    this.updateCamperInfo = function (req, res) {
        console.log('updateCamperInfo');
        var person = req.req.body.user;
        var personid = person['rid'];
        console.log('person[rid]:' + person['rid']);

        person.contactno = [{
            "cell": person.contactno
        }];
        db.update(personid).set(person).scalar()
            .then(function (uperson) {
                console.log('updated updateCamperInfo', uperson);

                userRegister.updateAddressinfo(person, req, res);
            }.bind({
                person: person
            }));


    }


    this.updateAddressinfo = function (person, req, res, vm) {
        console.log('updateAddressinfo');
        var addressinfo = req.req.body.addressinfo;
        var addressinfoid = req.req.body.addressinfo['rid'];
        console.log('addressinfoid :' + addressinfoid);
        var userid = person['rid'];
        console.log('userid :' + userid);

        var strUpdate = 'physicaladdress=\'' + addressinfo.physicaladdress + '\' , postaladdress=\'' + addressinfo.postaladdress + '\' , postalcode=\'' + addressinfo.postalcode + '\'';


        db.update(addressinfoid).set(strUpdate).one()
            .then(function (uperson) {
                console.log('updated updateAddressinfo', uperson);

                // userRegister.updateParent(person,req,res);
                userRegister.updateTshirt(person, req, res);

            }.bind({
                person: person
            })).catch(function (err) {
                console.log("updateAddressinfo  error" + err);
                // userRegister.updateParent(person,req,res);
                userRegister.updateTshirt(person, req, res);

            });


    }




    this.updateParent = function (person, req, res) {
        console.log('parent');
        console.log('parent person:' + person);
        var parentArray = req.req.body.perantGardians;
        var i = 0;
        for (i = 0; i < parentArray.length; i++) {

            var parent1 = parentArray[i];
            console.log('parent1:' + parent1);
            var userid = person['rid'];
            var parentid = parent1['rid'];

            if (parentid != undefined) {
                console.log('parent1 has rid:' + parentid);
                db.update(parentid).set(parent1).scalar()
                    .then(function (person) {
                        console.log('updated parent1', person);
                    });

            } else {
                console.log('new parentU ');
                console.log('personU :' + JSON.stringify(person));
                db.insert().into('person').set(parent1).one()
                    .then(function (parent1) {
                        console.log('created', parent1);
                        console.log('person:' + person['rid']);
                        db.create('EDGE', 'parent').set({
                                relation: parent1.relation
                            }).to(parent1['@rid'].toString()).from(person['rid']).one()
                            .then(function (edge) {
                                // res.send(req.body.person);
                                console.log('created parentEdge');

                            });
                    }.bind({
                        person: person
                    }));
            }
        }


        var parentArrayOld = req.req.body.perantGardiansold;

        for (j = 0; j < parentArrayOld.length; j++)
        {
            var parent1old = parentArrayOld[j];
            if (parent1old != undefined) {

                var parentidold = parent1old['rid'];

                console.log('parent1old has rid:' + parentidold);
                db.delete('VERTEX','person').where('@rid =' + parentidold  ).one()
                    .then(function (person) {
                        console.log('deleted parentidold', person);
                    });

            }
        }

        userRegister.updateMedicalaidinfo(person, req, res);

        // vm.emergancy1(person,req,res,vm);
    }



    this.updateMedicalaidinfo = function (person, req, res) {
        console.log("updateMedicalaidinfo person:" + JSON.stringify(person));

        if (req.req.body.medicalaidinfo != undefined) {
            console.log("updateMedicalaidinfo medicalaidinfo:" + JSON.stringify(req.req.body.medicalaidinfo));
            if(req.req.body.medicalaidinfo['@rid'] == undefined)
                {

                    var userid = person['rid'];
                    console.log('userid:', userid);
                    db.insert().into('MedicalAidInformation').set(req.req.body.medicalaidinfo).one()
                        .then(function (medicalaidinfo) {
                            console.log('created', medicalaidinfo);
                           console.log('created', medicalaidinfo['@rid']);
                         console.log('created', medicalaidinfo['@rid'].toString());
                            //res.send(person);
                            //return company
                            if (medicalaidinfo['@rid'] != undefined) {
                                db.create('EDGE', 'medicalaidinfoEdge').to(medicalaidinfo['@rid'].toString()).from(userid).one()
                                    .then(function (edge) {
                                        // res.send(req.body.person);
                                        console.log('created medicalaidinfoEdge');
                                         //userRegister.updateOther(person, req, res);
                                        userRegister.updateMedicalinfo(person, req, res);
                                    });
                            }
                        });


                }else{




            console.log("andrew:" + req.req.body.medicalaidinfo);
            console.log("andrew:" + (req.req.body.medicalaidinfo == undefined));
            if (req.req.body.medicalaidinfo == undefined) {
                var medicalaidinfo = {};
                medicalaidinfo.hasmedicalAid = 'false';
            } else {
                var medicalaidinfo = req.req.body.medicalaidinfo;
            }



            var userid = person['@rid'];
            var medicalaidinfoid = req.req.body.medicalaidinfo['@rid'];

            if (medicalaidinfo.MedicalPlan == undefined) {
                medicalaidinfo.MedicalPlan = '';
            }

            if (medicalaidinfo.RelationToCamper == undefined) {
                medicalaidinfo.RelationToCamper = '';
            }

            if (medicalaidinfo.CampersBenificary == undefined) {
                medicalaidinfo.CampersBenificary = '';
            }


            var strUpdate = 'MainMemberName=\'' + medicalaidinfo.MainMemberName + '\' , MedicalPlan=\'' + medicalaidinfo.MedicalPlan + '\' , CampersBenificary=\'' + medicalaidinfo.CampersBenificary + '\', MedicalAidName=\'' + medicalaidinfo.MedicalAidName + '\', RelationToCamper=\'' + medicalaidinfo.RelationToCamper + '\', MedicalAidNo=\'' + medicalaidinfo.MedicalAidNo + '\', hasmedicalAid=\'' + medicalaidinfo.hasmedicalAid + '\'';

            console.log("strUpdate:" + strUpdate);


            console.log("medicalaidinfoid:" + medicalaidinfoid);

            db.update(medicalaidinfoid).set(strUpdate).one()
                .then(function (medicalaidinfou) {
                    console.log('updated medicalaidinfo', medicalaidinfou);
                    //userRegister.updateOther(person, req, res);
                    userRegister.updateMedicalinfo(person, req, res);
                }.bind({
                    person: person
                }));
            }
        } else {
            userRegister.updateMedicalinfo(person, req, res);
        }
    }

    this.updateMedicalinfo = function(person, req, res)
    {
        console.log('Medicalinfo person:'+JSON.stringify(person));
        if (req.req.body.medicalinfo['@rid'] != undefined)
        {
            console.log('new  Medicalinfo');
            var medicalinfo = req.req.body.medicalinfo;
            var userid = person['rid'];
            console.log('person1:'+JSON.stringify(person));
            console.log('userid:'+userid);
            db.insert().into('medicalinfo').set(medicalinfo).one()
                .then(function (medicalinfo) {
                    console.log('created', medicalinfo);
                    console.log('userid', person['@rid']);
                    console.log('medicalinfo rid', medicalinfo['@rid']);
                    //res.send(person);
                    //return company
                    db.create('EDGE', 'medicalInfoEdge').to(medicalinfo['@rid'].toString()).from(userid).one()
                        .then(function (edge) {
                            // res.send(req.body.person);
                            console.log('created medicalInfoEdge');
                            userRegister.updateOther(person, req, res);
                        }.bind({
                            person: person
                        }));

                }.bind({
                    person: person
                }));


        }else
        {
            console.log('update  Medicalinfo');
            var userid = person['rid'];
            db.select('out(\'medicalInfoEdge\')[0]').from(userid).all()
                .then(function (medicalinfoinfo) {
                    console.log("medicalinfoinfo search return:" + JSON.stringify(medicalinfoinfo[0]['out']));
                    db.update(medicalinfoinfo[0]['out']).set(req.req.body.medicalinfo).one()
                        .then(function (edge) {
                            // res.send(req.body.person);
                            console.log('created medicalInfoEdge');
                            userRegister.updateOther(person, req, res);
                        }.bind({
                            person: person
                        }));
                });


           // userRegister.updateOther(person, req, res);
        }



    }



    this.updateOther = function (person, req, res) {
        console.log('updateOther');

        if (req.req.body.otherinfo != undefined) {
            if (req.req.body.otherinfo['rid'] != undefined) {

                var otherinfo = req.req.body.otherinfo;

                var otherinfoid = otherinfo['rid'];
                console.log('otherinfo[rid]:' + otherinfoid);

                var strUpdate = 'otherinfo=\'' + otherinfo.otherinfo + '\'';
                console.log('strUpdate:' + strUpdate);
                db.update(otherinfoid).set(strUpdate).one()
                    .then(function (otherInfoUpdated) {
                        console.log('updated updateOther', otherInfoUpdated);
                        res.res.send("Done");
                    });
            } else {
                var otherinfo = req.req.body.otherinfo;
                var userid = person['rid'];
                db.insert().into('otherinfo').set(otherinfo).one()
                    .then(function (otherinfo) {
                        console.log('created', otherinfo);
                        //res.send(person);
                        //return company
                        db.create('EDGE', 'otherEdge').to(otherinfo['@rid'].toString()).from(userid).one()
                            .then(function (edge) {
                                // res.send(req.body.person);
                                //console.log('created otherEdge');

                                res.res.send("Done");

                            });

                    });
            }
        } else {

            res.res.send("Done");
        }


    }



    this.updateTshirt = function (person, req, res) {
        console.log('updateTshirt');
        console.log('updateTshirt:req.req.body.tshirt' + JSON.stringify(req.req.body.tshirt));
        var tshirt = req.req.body.tshirt;
        var userid = person['rid'];
        var tshirtoldedge = tshirt['edge'];
        var tshirtold = tshirt['old'];

        console.log('tshirtoldedge:' + tshirtoldedge);
        console.log('tshirtold:' + tshirtold);
        console.log('userid:' + userid);

        //delete edge
        //add new edge
        if (req.req.body.tshirt.old != undefined) {
            db.delete('EDGE', 'tshirtEdge').from(userid).to(tshirtold).scalar()
                .then(function (edge) {
                    // res.send(req.body.person);
                    console.log('delete old tshirtEdge');
                    console.log('userid:' + userid);
                if(tshirt.required)
                    {
                         db.create('EDGE', 'tshirtEdge').to(tshirt.size).from(userid).one()
                        .then(function (edge) {
                            // res.send(req.body.person);
                            console.log('create new tshirtEdge');
                            userRegister.updateTransport(person, req, res);
                        }).bind({
                            person: person
                        });

                    }else{
                         userRegister.updateTransport(person, req, res);
                    }
                }).bind({
                    person: person
                });

        } else if(tshirt.required)
{
  db.create('EDGE', 'tshirtEdge').to(tshirt.size).from(userid).one()
                        .then(function (edge) {
                            // res.send(req.body.person);
                            console.log('create new tshirtEdge');
                            userRegister.updateTransport(person, req, res);
                        }).bind({
                            person: person
                        });


        } else {
            userRegister.updateTransport(person, req, res);
        }


    }

    this.updateTransport = function (person, req, res) {
        console.log('updateTransport');
        var userid = person['rid'];

        var transport = req.req.body.transport;

          console.log('updateTransport:transport' + JSON.stringify(transport));
         console.log('req.req.body.transport.old' + req.req.body.transport.old);

        if (req.req.body.transport.old != undefined) {
            transport = req.req.body.transport;
            db.delete('EDGE', 'transportEdge').from(userid).to(transport.old.rid).scalar()
                .then(function (edge) {
                    // res.send(req.body.person);
                    console.log('delete old transportEdge');
                    console.log('userid:' + userid);
                    if (transport.required == true) {
                        db.create('EDGE', 'transportEdge').to(transport.from).from(userid).one()
                            .then(function (edge) {
                                // res.send(req.body.person);
                                console.log('created new transportEdge');
                                userRegister.updateParent(person, req, res);
                            }).bind({
                                person: person
                            });
                      } else {
                         userRegister.updateParent(person, req, res);
                   }
                }).bind({
                    person: person
                });

        }else if(req.req.body.transport.required)
        {
             db.create('EDGE', 'transportEdge').to(transport.from).from(userid).one()
                            .then(function (edge) {
                                // res.send(req.body.person);
                                console.log('created new transportEdge');
                                userRegister.updateParent(person, req, res);
                            }).bind({
                                person: person
                            });

        }else {
            userRegister.updateParent(person, req, res);

         }

    }

}




var userRegister = new UserRegister();

module.exports = userRegister;