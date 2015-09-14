var express = require('express');
var app = express();
var http = require('http').Server(app);
var port = 4000;

// Make available the front-end javascript and css files
app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res) {
	res.sendFile(__dirname + '/index.html');
});

http.listen(port, function(){
	console.log('Server started and listening on ' + port);
});