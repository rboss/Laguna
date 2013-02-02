var http = require('http');

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

exports.getMatchDetails = function(matchId, callback) {
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
exports.getMatchhistory = function(callback) {
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