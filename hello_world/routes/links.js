
var express = require('express');
var app = module.exports = express();
var mongoose = require('mongoose');

var linkSchema = new mongoose.Schema({
	name: String,
	url: String,
	id: Number	
}); // ends link

var links = mongoose.model('links', linkSchema);

mongoose.connect('mongodb://localhost/jasontest');


//find all links
app.get('/links', function(req, res) {

	//find all documents in mongodb
	links.find(function(err, link) {
		if (err) {
			console.log("error: find all links");
		}
		//list all links into index
		res.render("index", {links: link});

	}); //end links.find

}); //end of display all links


//find link by id
app.get('/links/:id', function(req, res) {
	var find_id = req.params.id;
	if (find_id == "new") {
		//display form
		res.render('new', {title: "Create Link"})
	} else {

		//find document base on id in mongodb
		links.findOne({_id: find_id}, function(err, link) {
			if (err) {
				console.log("error: display link by id");
			}
			//display link into show
			res.render("show", {link: link});

		});  //end links.findOne
	}
}) //end of display link by id


//new link form
app.get('/links/new', function(req, res) {

	var find_new = req.params.new;
	if (find_new == "new") {
		//display form
		res.render('new', {title: "Create Link"})
	}
}); //end new link form


//create new link
app.post('/links', function(req, res) {

	var new_name = req.body.name;
	var new_url = req.body.url;
	//store new link into model
	var new_link = new links({ name: new_name, url: new_url });
	//save new link into mongodb
	new_link.save(function(err) {
		if (err)
			console.log("error");

	}); //end new_link.save
	//display new link after creating
	res.send("<a href='"+new_link.url+"' id='"+new_link.id+"'>"+new_link.name+"</a>");
	return;

}); //end create new link


//update link
app.put('/links/:id', function(req, res) {

	var find_id = req.params.id;
	var find_name = req.body.name;
	var find_url = req.body.url;

	//find link by id
	links.findOne({_id: find_id}, function(err, link) {
		//store new values from input
		link.name = find_name;
		link.url = find_url;

		if(err) {
			console.log("error: update link by id");
		}

		//update document with new values
		link.save(function(err) {
			if(err)
				console.log("error: saving update");
		});
		//go back to links page
		res.redirect("..");
		return;

	}); //end of links.findOne

}); //end of update link


//delete link
app.delete('/links/:id', function(req, res) {

	var find_id= req.param('id');

	//find link by id and remove
	links.find({_id: find_id}).remove().exec();

	//go back to index page
	res.redirect("..");

}); //end of delete links