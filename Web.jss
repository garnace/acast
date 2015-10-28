//require("coffee-script")
//require("coffee-script/register")
//require("./server")

var express=require('express');
var mongo = require('mongodb');
var routes= require('./routes');
var user= require('./routes/user');
var monk = require('monk');
var MongoClient = require('mongodb').MongoClient;
var assert  = require('assert');
var db;
//var db = monk('localhost:27017/notepad');
var http=require('http');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var logger = require('morgan');
var errorHandler = require('errorhandler');
var multipart = require('connect-multiparty')
var multipartMiddleware = multipart();

//var monUrl='mongodb://localhost:27017/things';
//var monUrl='mongodb://localhost:27017/things';
var monUrl='mongodb://localhost:27017/test';
var path = require('path'), fs = require('fs'),
cons = require('consolidate'),
  dust = require('dustjs-linkedin'),
  utils = require('./model/utils'),
  recipesModel = require('./routes/recipes');

dust.config.whitespace = true;
var app = express();

app.engine('dust', cons.dust);
app.set('view engine', 'dust');
app.set('views', __dirname + '/views');


// all environments
 app.set('port', 7777);
app.use(logger('dev'));
app.use(bodyParser.urlencoded({extended:true}));

app.use(bodyParser.json());
app.use(methodOverride());
app.use(express.static(path.join(__dirname,'public')));
app.use('/style',express.static(path.join(__dirname,'/views/style')));




// mongoDB

// // Do all your "pre-route" use() functions first
// app.use(function (req, res, next) {
 //   req.locals.db = db;
 // this is setting up db property to request
  //  next();
   //    });

 //app.get('/users', routes.userlist);
//--above 

MongoClient.connect(monUrl,function(err,database){
	if (err) throw err;

	db = database;
http.createServer(app).listen(app.get('port'), function() {
		console.log('Express db server listening on port '+ app.get('port'));
		});
});

/* put above
http.createServer(app).listen(app.get('port'), function() {
		console.log('Express db server listening on port '+ app.get('port'));
		});
*/
	//app.listen(port);
	//console.log("listening to port");

//app.locals.db = db;
app.get('/', serveFirstPage);

/*app.get('/listdb',function(req,res){

	db.driver.admin.listDatabases(function(e,dbs){

	res.json(dbs);});

});
*/
app.get('/fav',function(req,res){

//	var collection= req.db.get('things');
//	var collection= db.get('things');
//	var collection= db.get('stage');
	var collection= db.collection('things');
	//collection.find({},{}, function(e,docs){
	collection.find({},{}).toArray( function(e,docs){
	if (e) return next(e);
	//res.render('landingPage',{"stage":docs});
	res.send(docs);
	});
}
);

function serveFirstPage(req, res) {
	var randomInt=utils.getRandomInt(0,2);

	var backgroundPath = '/images/backgrounds/';
	if (randomInt === 1)
	{
		backgroundPath += 'citrus.jpg';
	}
	else
	{

		backgroundPath += 'strawberry.jpg';
	}
//	var backgroundPath = '/images/backgrounds/';
//jj		backgroundPath += 'citrus.jpg';

//	res.render('landingPage',{backgroundImage:backgroundPath},{stage:"textstage"});
	res.render('landingPage',{backgroundImage:backgroundPath,stage:"text text text"});
}

/*http.createServer(app).listen(app.get('port'), function() {
		console.log('Express server listening on port '+ app.get('port'));
		});*/
