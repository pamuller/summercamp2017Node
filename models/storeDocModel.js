"use strict";
var db = require("../orientDBConfig.js");
var formidable = require('formidable');
var path = require('path');
var fs = require('fs');
var util = require('util');
var mime = require('mime-types');
function StoreDoc() {

this.upload = function(res,req)
	  {

        var uploadFilename = "";
        var person = null;

       console.log("1:"+req);
       console.log("2:"+req.file);
       console.log("2.5:"+JSON.stringify(req.body));
           // create an incoming form object
          var form = new formidable.IncomingForm();

          // specify that we want to allow the user to upload multiple files in a single request
          form.multiples = false;


        console.log("__dirname"+__dirname);
          // store all uploads in the /uploads directory
          form.uploadDir = path.join('/opt/nodejsapps', '/uploads/2016');

          // every time a file has been uploaded successfully,
          // rename it to it's orignal name
          form.on('file', function(field, file) {
               console.log("3:"+file);
               console.log("3.5:"+field);
              console.log("4:"+file.name);
              console.log("5:"+person['refnumber']);
              uploadFilename = person['refnumber'] + '_'+file.name;
            fs.rename(file.path, path.join(form.uploadDir, uploadFilename));
            storedoc.upDateCamperDoc(res,uploadFilename,person['rid']);
          });



          // log any errors that occur
          form.on('error', function(err) {
            console.log('An error has occured: \n' + err);
          });


          form.on('field', function(name, value) {
              console.log('value:'+value);
              person = JSON.parse(value);

          });


          // once all the files have been uploaded, send a response to the client
          form.on('end', function() {
            res.end('success');


             // console.log(req);
             // console.log("this.reqIn:"+this.reqIn);


          });

          // parse the incoming request containing the form data
          form.parse(req, function(err, fields, files) {
               //console.log("fields:"+fields);
            //  console.log("fields['person']:"+fields['person']);
              //console.log(util.inspect({fields: fields, files: files}))
                if (err) return next(err);
                //res.send(200, util.inspect({fields: fields, files: files}));
                });
	  };


this.downloadFile = function(req,res,filename)
{

    var file = '/opt/nodejsapps/uploads/2016/'+filename;
    //res.download(file); // Set disposition and send it.


    res.setHeader('Content-disposition', 'attachment; filename='+filename);

     fs.readFile(file, function (err, content) {
	        if (err) {
	            res.writeHead(400, {'Content-type':'text/html'})
	            console.log(err);
	            res.end("No such file");
	        } else {



	            //specify Content will be an attachment


	            res.writeHead(200, {
                  'Content-Type': mime.lookup(filename),
                  'Content-Disposition': 'attachment; filename='+filename,
                  'Content-Length': content.length
                });
	            res.end(content);
	        }
	    });

}

this.upDateCamperDoc = function(res,filename,userid)
{
    console.log('filename:'+filename);
    console.log('userid:'+userid);
  //  console.log('req.file:'+req.file);

     var strInsert ={'filename':filename};
     //var userid=req.person['@rid'];
     db.insert().into('storeDoc').set(strInsert).one()
			.then(function (storeDoc) {

                 db.create('EDGE','docuploadEdge').to(storeDoc['@rid'].toString()).from(userid).one()
                     .then(function(edge){
                        // res.send(req.body.person);
                         console.log('created docuploadEdge');
                         res.end('success');
                    });

			});


}





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



}

var storedoc = new StoreDoc();

module.exports = storedoc;