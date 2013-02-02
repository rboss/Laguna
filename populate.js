var lagunadb = require('./lagunadb');
var _ = require('underscore');

var db = lagunadb.init();

db.clearMatches();

db.insertMatch({id: 14, name: "first"});
db.insertMatch({id: 15, name: "second"});
db.insertMatch({id: 112, name: "third"});
db.insertMatch({id: 112, name: "fourth"});

db.findMatches(function(matches) {
	_.each(matches, function(match) {
		console.log(match.id);
	});
});
