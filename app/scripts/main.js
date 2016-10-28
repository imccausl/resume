(function(document) {
	// load resume data from JSON file
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
					console.log(req.response)
					reject(Error(req.statusText));
				};
			};
		
			req.onerror = function() {
				// it failed with a network error
				reject(Error("Network error.");
			};
		
			req.send();
		});
	}
	
	function getJSON(data) {
		return JSON.parse(data);
	}
	
	function loadResumeData() {
		var resumeData = {};
		
		get("../resume.json")
			.then(function(response) {
				resumeData = getJSON(response);
				console.log(resumeData);
			})
			.catch(function(statusText) {
				console.log(statusText);
			});
	}
	
	loadResumeData();
})(document);
