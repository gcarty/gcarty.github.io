/*
The following section establishes all objects, arrays and the variables required to build the page.
The "Display" element in each object has the code to format and display the content of the object
*/

// Declare Bio objects, arrays and the variables
var bio = {
	"name": "Glen Carty", 
	"role": "Web Ninja" , 
	"welcomeMessage": "Welcome to my Home Page ",
	"biopic": "images/logo.jpg",
	"contacts": {
		"mobile": "800 555 5555",
		"email": "gcarty@yahoo.com",
		"github": "gcarty",
		"twitter": "@no-twitter-acct",
		"location": "Tampa"
		},
	"skills": ["CSS Coding","Front End Development","Beginner Java Scripter"],
	display: function() {

		//Build Formatted Variables for Display

		var formattedName=HTMLheaderName.replace("%data%",bio.name); 
		var formattedRole=HTMLheaderRole.replace("%data%",bio.role); 
		var formattedPic=HTMLbioPic.replace("%data%",bio.biopic); 
		var formattedMsg=HTMLwelcomeMsg.replace("%data%",bio.welcomeMessage); 
		var formattedMobile=HTMLmobile.replace("%data%",bio.contacts.mobile);
		var formattedEmail=HTMLemail.replace("%data%",bio.contacts.email);
		var formattedGithub=HTMLgithub.replace("%data%",bio.contacts.github);
		var formattedTwitter=HTMLtwitter.replace("%data%",bio.contacts.twitter);
		var formattedLocation=HTMLlocation.replace("%data%",bio.contacts.location);

		//Diplay Header

		$("#header").prepend(formattedRole);
		$("#header").prepend(formattedName);
		$("#header").append(formattedMsg);
		$("#header").append(formattedPic);
		$("#topContacts").append(formattedMobile);
		$("#topContacts").append(formattedEmail);
		$("#topContacts").append(formattedGithub);
		$("#topContacts").append(formattedTwitter);
		$("#topContacts").append(formattedLocation);

		//Repeat contacts in footer
		$("#footerContacts").append(formattedMobile);
		$("#footerContacts").append(formattedEmail);
		$("#footerContacts").append(formattedGithub);
		$("#footerContacts").append(formattedTwitter);
		$("#footerContacts").append(formattedLocation);

		//Display Skills if bio.skills is not empty

		if(bio.skills.length > 0) {
		$("#header").append(HTMLskillsStart);
		var formattedSkill=HTMLskills.replace("%data%",bio.skills[0]);
		$("#header").append(formattedSkill);
		formattedSkill=HTMLskills.replace("%data%",bio.skills[1]);
		$("#header").append(formattedSkill);
		formattedSkill=HTMLskills.replace("%data%",bio.skills[2]);
		$("#header").append(formattedSkill);
	};
	}
}; 

//Declare Work objects, arrays and the variables
var work = {
	"jobs": [
		{
			"employer": "International Janitorial Services",
			"title": "Chief Janitor",
			"location": "London, England",
			"dates": "1997 to 2002",
			"description": "Clean offices, remove trash and create a clean environment to stiimulate the creatiivity of the higher paid workers. My objective was to be the best janitor that ever walked the office floors.",
		},
		{
			"employer": "Brown Bag Services",
			"title": "Chief Lunch Packer",
			"location": "Ireland",
			"dates": "2005 to 2015",
			"description": "As chief lunch packer of the Brown Bag Services, an international organization, I was responsible for ensuring the bags were colored brown. These brown bags were responsible for many lunch and learn sessions that inspired creativity.",
		}
	],
	display: function() {

		//Build and Display Formatted Work Experience
		for (job in work.jobs) { 
 		$("#workExperience").append(HTMLworkStart);

 		var formattedEmployer=HTMLworkEmployer.replace("%data%",work.jobs[job].employer);
		var formattedTitle=HTMLworkTitle.replace("%data%",work.jobs[job].title);
		var formattedEmployerTitle = formattedEmployer + formattedTitle;
		var formattedWorkDates=HTMLworkDates.replace("%data%",work.jobs[job].dates);
		var formattedLocation=HTMLworkLocation.replace("%data%",work.jobs[job].location);
		var formattedDescription=HTMLworkDescription.replace("%data%",work.jobs[job].description);

		$(".work-entry:last").append(formattedEmployerTitle);
		$(".work-entry:last").append(formattedWorkDates);
		$(".work-entry:last").append(formattedLocation);
		$(".work-entry:last").append(formattedDescription);
	};
	}
};

// Decalare Projects objects, arrays and the variables
var projects = {
	"projects": [
		{
			"title": "Brown Bag Design",
			"dates": "2010-2011",
			"description": "Design Logo for new Brown Bags",
			"images": [
				"images/big-brown-bag.jpg",
				"images/med-brown-bag.png"
				]
		},
		{
			"title": "Udacity Projects",
			"dates": "2015-present",
			"description": "Work material from Udacity Course",
			"images": [
				"images/japan.jpg",
				"images/brazil.jpg"
				]
		}
	],
	display: function () {

		//Build and Dissplay formatted Projects

		for (project in projects.projects) { 
 		$("#projects").append(HTMLprojectStart);

 		var formattedTitle=HTMLprojectTitle.replace("%data%",projects.projects[project].title);
		var formattedProjecDate=HTMLprojectDates.replace("%data%",projects.projects[project].dates);
		var formattedProjectDescription=HTMLprojectDescription.replace("%data%",projects.projects[project].description);

		$(".project-entry:last").append(formattedTitle);
		$(".project-entry:last").append(formattedProjecDate);
		$(".project-entry:last").append(formattedProjectDescription);

		if (projects.projects[project].images.length >0) {
			for (image in projects.projects[project].images) {
			var formattedImage=HTMLprojectImage.replace("%data%",projects.projects[project].images[image]);
			$(".project-entry:last").append(formattedImage);
			}
		}
	}
	}
};

//Declare Education objects, arrays and the variables
var education = { 
	"schools": [
		{
	 		"name": "Calabar High",
	 		"location": "Kingston, Jamaica",
	 		"degree": "A-Levels",
	 		"majors": ["Fun","and More Fun"],
	 		"dates": 1977
	 	},
	 	{
	 		"name": "University of the West Indies",
	 		"location": "Kingston, Jamaica",
	 		"degree": "Sound Engineering",
	 		"majors": ["Music", "Fun"],
	 		"dates": 1982
	 	}
	 ],
	"onlineCourses": [
		{
     			"title": "Front End Developer",
     			"school": "Udacity ",
     			"url": "http://udacity.com",
     			"date": 2015
     		}
     	],


// Start of Added this section 
	display: function () {
		for (school in education.schools) { 
			$("#education").append(HTMLschoolStart);
 		
 			var formattedName=HTMLschoolName.replace("%data%",education.schools[school].name);
			var formattedDegree=HTMLschoolDegree.replace("%data%",education.schools[school].degree);
			var formattedNameDeg=formattedName+formattedDegree;
			var formattedDates=HTMLschoolDates.replace("%data%",education.schools[school].dates);
			var formattedLocation=HTMLschoolLocation.replace("%data%",education.schools[school].location);

			$(".education-entry:last").append(formattedNameDeg);
			$(".education-entry:last").append(formattedDates);
			$(".education-entry:last").append(formattedLocation);

			if (education.schools[school].majors.length >0) {
				for (major in education.schools[school].majors) {
				var formattedMajor=HTMLschoolMajor.replace("%data%",education.schools[school].majors[major]);
				$(".education-entry:last").append(formattedMajor);
				};
			};
		};
	
		var formattedTitle=HTMLonlineTitle.replace("%data%",education.onlineCourses[0].title);
		var formattedSchool=HTMLonlineSchool.replace("%data%",education.onlineCourses[0].school);
		var formattedTitleSchool=formattedTitle + formattedSchool;
		var formattedDates=HTMLonlineDates.replace("%data%",education.onlineCourses[0].date);
		var formattedURL=HTMLonlineURL.replace("%data%",education.onlineCourses[0].url);
		
		$(".education-entry:last").append(HTMLonlineClasses);
		$(".education-entry:last").append(formattedTitleSchool);
		$(".education-entry:last").append(formattedDates);
		$(".education-entry:last").append(formattedURL);
	}

//End of added Section */
};

// Display the page sections
bio.display();
work.display();
projects.display();
education.display();

//Add the map to the page
$("#mapDiv").append(googleMap);

$(document).click(function(loc) {
	var x = loc.pageX;
	var y = loc.pageY;

	logClicks(x,y);
});