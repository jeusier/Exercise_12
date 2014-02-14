
var express = require('express');
var app = module.exports = express();



//array to hold all Link instances
var links = [];
  
//Link class for links
function Link(name, url) {
	this.name = name;
	this.url = url;
	this.id = links.length;
}

// get findAllLinks
app.get("/links", function(req, res) {
	var allLinks = "";
	if(links.length === 0) {
		res.render("index", {title: "Display all Links", links: "empty"});
		return;
		} else {
		for (var i = 0; i < links.length; i++) {
		res.render("index", {title: "Display all Links", links: links});
		}
	}
}); // ends findAllLinks


app.get('/links/:id/:edit', function(req, res){
	var post_id = req.params.id;
	var post_edit = req.params.edit;
	console.log("id: "+post_id);
	console.log("edit: "+post_edit);
	if (post_edit == "edit"){
		res.render('edit', {name: links[post_id].name, url: links[post_id].url, id: post_id});
	}
});


app.get('/links/:id', function(req, res){
	var post_id = req.params.id;

	if (post_id == "new"){
		res.render('new', {title: "Create Link", links: links});
	} else {
		if(links.length === 0) {
		res.render("show", {title: "Display Link", links: "empty"});
		return;
		} else {
			for (var i = 0; i < links.length; i++){
				if (links[i].id == post_id){
						var name = links[i].name;
						var url = links[i].url;
						var id = links[i].id
					res.render('show', {title: "Display Link", name: name, url: url, id: id});
				}
			}
		}
	}
});


app.post('/links', function(req, res){
	var post_url = req.body.url;
	var post_name = req.body.name;
	var post_id = req.body.id;
	console.log("post_id: "+post_id);
	var post_link = new Link(post_name, post_url);
	links.push(post_link);
	//console.log("post test");
	//res.send('Added Link\n');
	res.render('show', {title: "Created Link", name: post_name, url: post_url, id: post_id});
});



app.put('/links/:id', function(req, res){
	if (links.length !== 0){
		var post_url = req.body.url;
		var post_name = req.body.name;
		var post_id = req.params.id;
		var id = req.body.id;
			console.log("test");
		for (var i = 0; i < links.length; i++){
				//if link with specified id is found, replace current values 
			if (links[i].id == post_id){
				console.log("post_id: "+post_id);
				links[i].id = post_id;
				links[i].name = post_name;
				links[i].url = post_url;
				res.render('show', {title: "Updated Link", name: post_name, url: post_url, id: post_id});
				return;
			}
		}
	}
	res.send("No links were found for the ID\n");
});

app.delete('/links/:id', function(req, res){
	if (links.length !== 0){
		//loop through links array to find the link with the specified id
		var post_id = req.params.id;
		for (var i = 0; i < links.length; i++){
			//if link with specified id is found, remove from array
			if (links[i].id == post_id){
				links.splice(i, 1);
				res.redirect('/links');
				return;
			} else {
				res.send("Link with specified ID does not exist\n");
				return;
			}
		}
	}
	res.send("No links are currently stored\n");
});
