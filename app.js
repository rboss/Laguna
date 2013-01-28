var express = require('express')
var app = express();
var http = require('http');
var port = process.env.PORT || 2013;

var mongoClient = require('mongodb').MongoClient;

//var fileServer = new static.Server('./public');

mongoClient.connect("mongodb://localhost:27017/db", function(err, db) {
  if(!err) {
    console.log("We are connected");
  }
});

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));  
});

var options = {
	host: "api.steampowered.com",
	port: 80,
	path: "/IDOTA2Match_570/GetMatchHistory/V001/?key=B957D9310F4F87536FFDD2EBA0B803C4"
};
var optionsDetails = function(matchId) {
	return {
		host: "api.steampowered.com",
		port: 80,
		path: "/IDOTA2Match_570/GetMatchDetails/V001/?key=B957D9310F4F87536FFDD2EBA0B803C4&match_id=" + matchId
	};
};

app.get(['/', '/matches'], function(req, res) {
	getMatchhistory(function(data) {
		res.render('index', { message: "laguna", matchHistory: data });
	});	
});
app.get('/match/:id', function(req, res) {
	var id = req.params.id;
	getMatchDetails(id, function(data) {
		res.render('match', { id: id, match_details: data });	
	});	
});

var getMatchDetails = function(matchId, callback) {
	http.get(optionsDetails(matchId), function(res) {
		var data = '';

		res.on('data', function(chunk) {
			data += chunk;
		});
		res.on('end', function() {
			console.log('End of get request for match details.');
			callback(JSON.parse(data).result);
		});
	});
};
var getMatchhistory = function(callback) {
	http.get(options, function(res) {
		var data = '';

		res.on('data', function(chunk) {
			data += chunk;
		});

		res.on('end', function() {
			console.log('End of get request for match history.');
			callback(JSON.parse(data).result);
		});

	}).on("error", function(e){
  		console.log("Got error while retrieving match history: " + e.message);
	});
};


app.listen(port);



console.log('Server started at port: ' + port);