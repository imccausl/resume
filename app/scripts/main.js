'use strict';

(function (document) {
	var model = {
		resume: {},
		header: {},
		templates: [],
		sectionHeaders: '<h3 class="text-capitalize">{{modifyHeader}}{{this.title}}</h3>',
		navMenu: {
			open: 'fa-chevron-down',
			close: 'fa-chevron-up'
		},
		
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
			var partialSource,
				copyright = new Date();

			console.log('Initializing the view!');

			// sort the professionalExperience and volunteer experience object arrays in descending order by start date.
			model.resume.professionalExperience.content = view.sortData(model.resume.professionalExperience.content, 'start');
			model.resume.volunteerExperience.content = view.sortData(model.resume.volunteerExperience.content, 'start');
			
			// register resusable section header partial
			Handlebars.registerPartial('sectionHeader', model.sectionHeaders);

			//register reusable experience section partial
			//to use with both relevant and other professional experience sections
			partialSource = $('#r-experience-partial').html();
			Handlebars.registerPartial('experiencePartial', partialSource);

			// TEMPORARY PLACEMENT OF CODE TO BUILD NAV MENU PARTIAL FOR TESTING AND DEV PURPOSES
			console.log("Registering nav menu template partial!");
			
			partialSource = $('#r-nav-template').html();
			Handlebars.registerPartial('navMenu', partialSource);
			
			// put the current year in the copyright date in footer.
			console.log("Putting current year in the footer", copyright.getFullYear() + "!");
			$('#r-copyright').html(copyright.getFullYear());
			
			app.getTemplateHTML(); // get the template HTML and store it in the model.
			app.buildHeader(model.resume.info); //builds the site header		
			app.buildResume(); // compile the templates and insert the data from the model into them.
			
			//FOR TESTING PURPOSES
			buildMenu(extractMenu(model.resume));
			addClickListeners();
		},

		sortData: function sortData(source, sortBy) {
			// sort experience by most recent to least recent employment

			return source.sort(function (a, b) {
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
				
				view.init();
			}).catch(function (status) {
				console.log(status); // something went wrong, log it to the console for now.
			});
		},

		buildHeader: function buildHeader(headerData) {
			var source;

			source = $('#r-header').html();
			model.header = Handlebars.compile(source);
			
			$('#r-header-view').append(model.header(headerData));
			
		},

		buildResume: function buildResume() {
			var resumeKeys = Object.keys(model.resume);
			var dataIndex = 1,
			    sectionHeader;

			for (var i = 0; i < model.templates.length; i++) {
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
		console.log("Building the menu!");
		var menuIds = document.getElementsByTagName('section'), item = 1, menuId, fullItem, testIds = [];
		
		for(var i=0; i < items.length; i++){
			menuId = '#' + menuIds[item].id;
			fullItem = '<li class="col-xs-6 col-sm-4 col-md-2"><a href="' + menuId + '">' + items[i] + '</a></li>';
			testIds.push(menuId); // for testing purposes
			
			$('#r-jump-menu-items').append(fullItem);
			$('#r-footer-menu').append('<li><a href="' + menuId + '">' + items[i] + '</a></li>');
			item++;
		}
	
	}
	
	//start it up!
	app.init();
	
	/* temporary placement of test items for resume navigation */
	
	function navMenuClicked() {
		var elm = $('#r-jump-menu'),
			icnElm = $('#r-nav-icon');
			
			if ( icnElm.hasClass(model.navMenu.open) ) {
				elm.hide().animate({height: "toggle"});
				
				icnElm.removeClass(model.navMenu.open);
				icnElm.addClass(model.navMenu.close);
			} else { 
				elm.show().animate({height:"toggle"});
				
				icnElm.removeClass(model.navMenu.close);
				icnElm.addClass(model.navMenu.open);
			}
			
	}
	
	function addClickListeners() {
		
		// click listener
		console.log($('#r-nav-menu').html());
		$('#r-nav-menu').on('click', function(e) {
			
			e.preventDefault();
			navMenuClicked();
			
		});
		
		$(document).on('click', function(e) {
			// navMenuClicked('close');
		});
	}		
	/* END temporary placement */
	
})(document);
//# sourceMappingURL=main.js.map
