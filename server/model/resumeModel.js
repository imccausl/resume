var	mongoose = require('mongoose'),
	Schema = mongoose.Schema;
		
var resumeModel = new Schema( {
	
	info: { 
		fullName: String,
		description: String,
		img: String,
	    addr: String,
	    city: String,
	    province: String,
	    
	    contact: { 
		    email: String,
			phone: String 
		},
		
		socialFeed: [ {
			service: String,
			url: String 
		} ] 
	},
    
    qualifications: { 
	    title: {type: String, default: "Summary of Qualifications"},
		content: [ { type: String } ],
		order: Number 
	},
	
    professionalExperience: { 
	    title: {type: String, default: "Professional Experience"},
		content: [ {
			start: String,
			end: String,
			position: String,
			company: String,
			location: String,
			highlights: [ { type: String } ],
			relevant: {type: Boolean, default: false} } ],
		order: Number 
	},
	
	volunteerExperience: { 
		title: {type: String, default: "Volunteer Experience"},
		content: [ { 
			start: String,
			end: String,
			position: String,
			company: String,
			location: String,
			highlights: [ {type: String} ],
			relevant: {type: Boolean, default: false} } ],
		order: Number 
	},
	
    publications: { 
	    title: {type: String, default: "Publications"},
		content: [ { 
			title: String,
			citation: String
		} ],
		order: Number 
	},
	
    education: { 
	    title: {type: String, default: "Education"},
		content: [ { 
			institution: String,
			degree: String,
			program: String,
			year: String,
			location: String,
			awards: [ {type: String} ],
			completed: {type: Boolean, default: true},
			notes: String,
			courses: [ { type: String } ] } ],
		order: Number 
	},
	
    technicalSkills: { 
	    title: {type: String, default: "Technical Skills"},
		content: [ { category: String, skills: String } ],
		order: Number 
	}

} );

module.exports = mongoose.model('Resume', resumeModel, "resume");
