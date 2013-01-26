var http = require('http');
var static = require('node-static');

var fileServer = new static.Server('./public');
var port = process.env.PORT || 2013;
var server = http.createServer(function(req, res) {
	req.addListener('end', function() {
		fileServer.serve(req, res);
	});
}).listen(port);

console.log('Server started at port: ' + port);