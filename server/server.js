const	http = require('http'),
		path = require('path'),
		express = require('express'),
		mongoose = require('mongoose'),
		db = mongoose.connect('mongodb://localhost/resume'),
		Resume = require('./model/resumeModel')
		bodyparser = require('body-parser'),
		app = express(),
		port = process.env.PORT || 8000,
		resumeRouter = express.Router();
		
resumeRouter.route('/resume')
	.post(function(req, res) {
		var resume = new Resume(req.body);
		
		resume.save();
		
		// status code 201: Created.
		res.status(201).send(resume);
		
		console.log("Resume added.");
	})
	.get(function(req, res) {
		
		Resume.find(function(err, resume) {
			res.json(resume);
			
			console.log(resume);
		});	
	});

app.use(bodyparser.urlencoded({extended:true}));
app.use(bodyparser.json())
app.use('/api', resumeRouter);
app.use(express.static(path.join(__dirname, '../')));
		
app.get('/', function(req, res) {
	res.send('Server is working.');
});

app.listen(port, function(){
	console.log('Server running on port: ' + port);
});

