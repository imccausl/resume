(function(document) {
	var model = {
		resume: {},
		header: {},
		templates: [],
		sectionHeaders: '<h3 class="text-capitalize">{{modifyHeader}}{{this.title}}</h3>',
		
		// methods
		get: function(path) {
			return new Promise(function(resolve, reject) {
			var req = new XMLHttpRequest();
			req.open('GET', path);
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
				reject('Network error');
			};
		
			req.send();
		});

		}
	};
	
	var view = {
		init: function() {
			var expTemplatePartial;
			
			// compile the handlebars templates
			console.log('Initializing the view!');
			
			model.resume.professionalExperience.content = view.sortData(model.resume.professionalExperience.content, 'start');	
						
			// register resusable section header partial
			Handlebars.registerPartial('sectionHeader', model.sectionHeaders);	
			
			//register reusable experience section partial
			//to use with both relevant and other professional experience sections
			expTemplatePartial = $('#r-experience-partial').html()
			Handlebars.registerPartial('experiencePartial', expTemplatePartial);
			
			app.getTemplateHTML();
			app.buildHeader(model.resume.info);	//builds the site header		
		},
		
		sortData: function(source, sortBy) {
			// sort experience by most recent to least recent employment

			return source.sort(function(a, b) {
				console.log(a[sortBy].substr(3), b[sortBy].substr(3));
				return b[sortBy].substr(3) - a[sortBy].substr(3);
			});
		}
	};
	
	var app = { 
		init: function() { 
			// load the JSON data for the resume
			model.get('./resume.json')
			.then(function(response) {
				// load was successful. Parse the JSON data
				model.resume = JSON.parse(response);
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
						
			source = $('#r-header').html();
			template = Handlebars.compile(source);
			model.header = template(headerData);
			
			$('#r-header-view').html(model.header)
		},
		
		buildResume: function() {
			var resumeKeys = Object.keys(model.resume);
			var dataIndex = 1, sectionHeader;
			
			for(var i=0; i<model.templates.length; i++) {
				console.log(model.resume[resumeKeys[dataIndex]]);
				$('#r-body-view').append(model.templates[i](model.resume[resumeKeys[dataIndex]]));
				dataIndex++;
			}
		},
		
		compileTemplate: function(templateHTML) {
			return Handlebars.compile(templateHTML.innerHTML);
		},
		
		/* getTemplateHTML() function
		 ----------------------------
		 * Grab all the templates by their common class name and then cycle through them
		 * in order to compile each one, then store the compliled templates in an array in the model
		 * to access at any time 
		 *******************************************************************************************/
		getTemplateHTML: function() {
			var templateLoc = document.getElementsByClassName('r-templates');
			model.templates = []; // initialize the array when the function is called, just in case, so we don't 
								  // get any duplicate entries
			
			for(var i=0; i < templateLoc.length; i++) {
				model.templates.push(this.compileTemplate(templateLoc[i]));	
			}
			
			app.buildResume();
		}
	};
	
	//start it up!
	app.init();
})(document);
