(function(document) {
	var model = {
		resume: {}
	};
		
	// use promises to create an XMLHttpRequest handler with error handling
	function get(path) {
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
	
	function getJSON(data) {
		return JSON.parse(data);
	}
	
	var app = { 
		init: function() { 
			get("./resume.json")
			.then(function(response) {
				model.resume = getJSON(response);
				console.log(model.resume);
			})
			.catch(function(status) {
				console.log(status);
			});
		}
	};
	
	app.init();
})(document);
