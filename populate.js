var lagunadb = require('./lagunadb');
var _ = require('underscore');
var webapi = require('./webapi');

var db = lagunadb.init();

//db.clearMatches();

 webapi.getMatchhistory(function(matchHistory) {
 	_.each(matchHistory.matches, function(match) {
 		db.insertMatch(match);
	});

	db.findMatches(function(matches) {
		console.log("#" + matches.length + " matches");
		//_.each(matches, function(match) {
		//	console.log(match.match_id);
		//});
	});

 });

