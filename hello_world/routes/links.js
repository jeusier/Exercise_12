
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

app.get('/links', function(req, res){
	if (links.length !== 0){
		var all = "";
		//loop through the array and store into a temporary string
		for (var i = 0; i < links.length; i++){
			all += "<a id='"+links[i].id+"' href='"+links[i].url+"'>"+links[i].name+"</a>\n";
		}
		res.send(all + '\n');
		return;
	}
	res.send("No links are currently stored\n");
});

app.get('/links/:id', function(req, res){
	if (links.length !== 0){
		var post_id = req.params.id;
		// console.log("post_id:"+post_id);
		var id_link = "";
		//loop through array to find the link with the specified id and store into variable as a string
		for (var i = 0; i < links.length; i++){
			if (links[i].id == post_id){
				id_link = "<a id='"+links[i].id+"' href='"+links[i].url+"'>"+links[i].name+"</a>\n";
				res.send(id_link + '\n');
				return;
			} else {
				res.send("No link found with specified ID\n");
				return;
			}
		}
	}
	res.send("No links are currently stored\n");
});

app.post('/links', function(req, res){
	var post_url = req.body.url;
	var post_name = req.body.name;
	var post_link = new Link(post_name, post_url);
	links.push(post_link);
	//console.log("post test");
	res.send('Added Link\n');
});

app.put('/links/:id', function(req, res){
	if (links.length !== 0){
		var post_url = req.body.url;
		var post_name = req.body.name;
		var post_id = req.params.id;
		for (var i = 0; i < links.length; i++){
				//if link with specified id is found, replace current values 
			if (links[i].id == post_id){
				console.log("post_id: "+post_id);
				links[i].id = post_id;
				links[i].name = post_name;
				links[i].url = post_url;
				res.send('Updated Link\n');
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
				res.end('The link has been deleted\n');
				return;
			} else {
				res.send("Link with specified ID does not exist\n");
				return;
			}
		}
	}
	res.send("No links are currently stored\n");
});
