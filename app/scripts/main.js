'use strict';

(function (document) {
	var model = {
		resume: {},
		header: {},
		templates: [],
		sectionHeaders: '<h3 class="text-capitalize">{{modifyHeader}}{{this.title}}</h3>',

		// methods
		get: function get(path) {
			return new Promise(function (resolve, reject) {
				var req = new XMLHttpRequest();
				req.open('GET', path);
				req.onload = function () {
					if (req.status === 200) {
						// it worked
						resolve(req.response);
					} else {
						// it failed
						reject(req.status);
					};
				};

				req.onerror = function () {
					// it failed with a network error
					reject('Network error');
				};

				req.send();
			});
		}
	};

	var view = {
		init: function init() {
			var expTemplatePartial;

			console.log('Initializing the view!');

			// sort the professionalExperience and volunteer experience object arrays in descending order by start date.
			model.resume.professionalExperience.content = view.sortData(model.resume.professionalExperience.content, 'start');
			model.resume.volunteerExperience.content = view.sortData(model.resume.volunteerExperience.content, 'start');
			
			// register resusable section header partial
			Handlebars.registerPartial('sectionHeader', model.sectionHeaders);

			//register reusable experience section partial
			//to use with both relevant and other professional experience sections
			expTemplatePartial = $('#r-experience-partial').html();
			Handlebars.registerPartial('experiencePartial', expTemplatePartial);

			app.getTemplateHTML(); // get the template HTML and store it in the model.
			app.buildHeader(model.resume.info); //builds the site header		
			app.buildResume(); // compile the templates and insert the data from the model into them.
		},

		sortData: function sortData(source, sortBy) {
			// sort experience by most recent to least recent employment

			return source.sort(function (a, b) {
				console.log(a[sortBy].substr(3), b[sortBy].substr(3));
				return b[sortBy].substr(3) - a[sortBy].substr(3);
			});
		}
	};

	var app = {
		init: function init() {
			// the app initializes by loading the JSON data for the resume...
			model.get('./resume.json').then(function (response) {
				// ... and then, if the load was successful, parsing the JSON data and storing it in the model
				model.resume = JSON.parse(response);
			}).then(function (response) {
				// since parsing was successful, start initializing the view
				
				//FOR TESTING PURPOSES
				buildMenu(extractMenu(model.resume));
				
				view.init();
			}).catch(function (status) {
				console.log(status); // something went wrong, log it to the console for now.
			});
		},

		buildHeader: function buildHeader(headerData) {
			var source, template, placement;

			source = $('#r-header').html();
			template = Handlebars.compile(source);
			model.header = template(headerData);

			$('#r-header-view').append(model.header);
		},

		buildResume: function buildResume() {
			var resumeKeys = Object.keys(model.resume);
			var dataIndex = 1,
			    sectionHeader;

			for (var i = 0; i < model.templates.length; i++) {
				console.log(model.resume[resumeKeys[dataIndex]]);
				$('#r-body-view').append(model.templates[i](model.resume[resumeKeys[dataIndex]]));
				dataIndex++;
			}
		},
		
		buildNavigation: function() {
			
		},

		compileTemplate: function compileTemplate(templateHTML) {
			return Handlebars.compile(templateHTML.innerHTML);
		},

		/* getTemplateHTML() function
   ----------------------------
   * Grab all the templates by their common class name and then cycle through them
   * in order to compile each one, then store the compliled templates in an array in the model
   * to access at any time 
   *******************************************************************************************/
		getTemplateHTML: function getTemplateHTML() {
			var templateLoc = document.getElementsByClassName('r-templates');
			model.templates = []; // initialize the array when the function is called, just in case, so we don't 
			// get any duplicate entries

			for (var i = 0; i < templateLoc.length; i++) {
				model.templates.push(this.compileTemplate(templateLoc[i]));
			}
		}
	};

	/* temporary placement of test items for resume navigation */
	
	// menu builder
	function extractMenu(dataSet) {
		var menuArray = [], key = "";
		
		for(key in dataSet) {
			if(dataSet[key].title) {
				menuArray.push(dataSet[key].title);
			}
		}
		
		return menuArray;
	}
	
	function buildMenu(items) {
		for(var i=0; i < items.length; i++){
			$('#r-jump-menu-items').append('<li><h4>' + items[i] + '</h4></li>');
		}
	}
	
	// click listener
	$('#r-nav-menu').on('click', function(){
		$('#r-jump-menu').toggle('.show');	
	});
	
	/* END temporary placement */
	
	//start it up!
	app.init();
})(document);
//# sourceMappingURL=main.js.map
