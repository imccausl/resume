const	http = require('http'),
		express = require('express'),
		mongoose = require('mongoose'),
		db = mongoose.connect('mongodb://localhost/resume'),
		app = express(),
		port = process.env.PORT || 8000;
		
app.get('/', function(req, res) {
	res.send('Server is working!');
});

app.listen(port, function(){
	console.log('Server running on port: ' + port);
});

