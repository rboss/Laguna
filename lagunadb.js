var mongojs = require('mongojs');

exports.init = function(port) {	
	var defaultPort = port || 27017
	var dbPath = "mongodb://localhost:" + defaultPort + "/db"
	var db = mongojs(dbPath, ["matches", "heroes"]);	

	db.matches.ensureIndex({ "match_id": 1 }, { unique: true });
	db.heroes.ensureIndex({ "id": 1 }, { unique: true });

	return {
		findMatches: function(callback) {
			db.matches.find(function(err, matches) {
				if (!err && typeof(callback) !== "undefined") {
					callback(matches);
				} else {
					console.log(err);
				}	
			});
		},
		insertMatch: function(match, callback) {
			//console.log("inserting match, id: " + match.id);
			db.matches.insert(match, function(err) {
				if (typeof (err) !== "undefined"  && typeof(callback) !== "undefined") {					
					callback(err); //name, code, err.
				}
			});
		},
		clearMatches: function() {
			//console.log('removing all matches')
			db.matches.remove();
		},
		insertHero: function (hero, callback){
			db.heroes.insert(hero, function(err) {				
				if (err && typeof callback !== "undefined"){
					callback(err);
				}
			});
		},
		findHeroes: function(callback) {
			db.heroes.find(function(err, matches) {
				if (!err && typeof callback !== "undefined"){
					callback(matches);
				} else  {
					console.log(err);
				}
			});
		},
		clearHeroes: function() {
			db.heroes.remove();
		}
	};
};

