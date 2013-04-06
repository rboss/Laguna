var express = require('express');
var app = express();
var port = process.env.PORT || 2013;

var webapi = require('./webapi');
var lagunadb = require('./lagunadb');


app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');  
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));  
});


app.get(['/', '/matches'], function(req, res) {
	webapi.getMatchhistory("", function(data) {
		res.render('index', { message: "laguna", matchHistory: data });
	});	
});
app.get('/match/:id', function(req, res) {
	var id = req.params.id;
	webapi.getMatchDetails(id, function(data) {
		res.render('match', { id: id, match_details: data });	
	});	
});


app.listen(port);

lagunadb.init();

console.log('Server started at port: ' + port);