(function(document) {
	var model = {
		resume: {},
		header: {},
		
		// methods
		get: function(path) {
			return new Promise(function(resolve, reject) {
			var req = new XMLHttpRequest();
			req.open("GET", path);
			req.onload = function() {
				if (req.status === 200) {
					// it worked
					resolve(req.response);
				} else {
					// it failed
					reject(req.status);
				};
			};
		
			req.onerror = function() {
				// it failed with a network error
				reject("Network error");
			};
		
			req.send();
		});

		}
	};
	
	var view = {
		init: function() {
			// compile the handlebars templates
			console.log("Initializing the view!");
			console.log(model.resume.info);
			
			app.buildHeader(model.resume.info);
			view.render()
			
		},
		
		render: function() {
			
		}
	};
	
	var app = { 
		init: function() { 
			// load the JSON data for the resume
			model.get("./resume.json")
			.then(function(response) {
				// load was successful. Parse the JSON data
				model.resume = JSON.parse(response);
				console.log(model.resume);
			}).then(function(response) {
				// parsing was successful start initializing the view
				view.init();
			})
			.catch(function(status) {
				console.log(status);
			});
		},
		
		buildHeader: function(headerData) {
			var source, template, placement;
			
			console.log(headerData.socialFeed);
			
			source = $('#r-header').html();
			template = Handlebars.compile(source);
			model.header = template(headerData);
			
			$('#r-header-view').html(model.header)
		},
		
		compileTemplates: function() {
			
		}
	};
	
	app.init();
})(document);
