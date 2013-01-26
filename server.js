var http = require('http');
var static = require('node-static');

var fileServer = new static.Server('./public');

var server = http.createServer(function(req, res) {
	req.addListener('end', function() {
		fileServer.serve(req, res);
	});
}).listen(process.env.PORT || 2013, '127.0.0.1');

console.log('Server started at localhost:2013');