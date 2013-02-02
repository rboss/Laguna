var mongojs = require('mongojs');

exports.init = function() {

	var db = mongojs("mongodb://localhost:27017/db", ["matches"]);


	return {
		findMatches: function(callback) {
			db.matches.find(function(err, matches) {
				if (!err) {
					callback(matches);
				} else {
					console.log(err);
				}
			});
		},
		insertMatch: function(match) {
			console.log("inserting match, id: " + match.id);
			db.matches.insert(match);
		},
		clearMatches: function() {
			console.log('removing all matches')
			db.matches.remove();
		}
	};
};

