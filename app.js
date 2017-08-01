
/**
 * Module dependencies.
 */

var express = require('express')
  , path = require('path')
  ,favicon = require('serve-favicon')
  ,logger = require('morgan')
  ,cookieParser = require('cookie-parser')
  ,bodyParser = require('body-parser')	
  ,cors = require('cors');
  ;

var app = express();

// all environments
//app.set('port', process.env.PORT || 3000);
app.set('views',path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.set('superSecret', "test This"); // secret variable
app.disable('x-powered-by');
//app.use(express.favicon());
//app.use(express.logger('dev'));
//app.use(express.bodyParser());

app.use(logger('common'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());


//app.use(express.methodOverride());
//app.use(app.router);
app.use(express.static(path.join(__dirname, '../SummerCamp2')));
app.use(cors());
app.options('*', cors());

//needed for security token

app.listen(3000);


/*app.all('/*', function (req, res, next) {

	   res.header("Access-Control-Allow-Origin", "*");
	   res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
	   res.header("Access-Control-Allow-Headers", "X-Requested-With, Content-Type");
	   res.setHeader('Access-Control-Allow-Credentials', true);
	  next();
	});*/



app.use(require("./routes"));

//development error handler
//will print stacktrace
if (app.get('env') === 'development') {
app.use(function(err, req, res, next) {
 res.status(err.status || 500);
 console.log(err.message);
 /*res.render('error', {
   message: err.message,
   error: err
 });*/
});
}

//production error handler
//no stacktraces leaked to user
app.use(function(err, req, res, next) {
res.status(err.status || 500);
console.log(err.message);
/*res.render('error', {
 message: err.message,
 error: {}
});*/
});

console.log("started server 3000");


module.exports = app;
