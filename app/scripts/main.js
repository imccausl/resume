(function(document) {
	var model = {
		resume: {}
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
	
	var app = { 
		init: function() { 
			model.get("./resume.json")
			.then(function(response) {
				model.resume = JSON.parse(response);
				console.log(model.resume);
			})
			.catch(function(status) {
				console.log(status);
			});
		}
	};
	
	app.init();
})(document);
