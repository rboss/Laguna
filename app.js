var express = require('express')
var app = express();
var port = process.env.PORT || 2013;

//var fileServer = new static.Server('./public');

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));  
});

app.get('/', function(req, res) {
	res.render('index', { message: "laguna"});
});

app.listen(port);


console.log('Server started at port: ' + port);