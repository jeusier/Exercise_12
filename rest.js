var http = require('http');
var url = require('url');
var qs = require('querystring');

//Link class for links
function Link(name, url) {
	this.name = name;
	this.url = url;
	this.id = links.length;

}

//array to hold all Link instances
var links = [];

//prints out all links currently in the array
function findAllLinks(req, res) {
	//console.log(links);
	var temp = "";
	//loop through the array and store into a temporary string
	for (var i = 0; i < links.length; i++){
		temp += "<a id='"+links[i].id+"' href='"+links[i].url+"'>"+links[i].name+"</a>\n";

	}
	res.writeHead(200, {'Content-Type': 'text/plain'});
	//displays all links to user
	res.end(temp + '\n');

}

//prints out the link with the user-specified id
function findLinkById(req, res, link_id) {
	var id_link = "";
	//loop through array to find the link with the specified id and store into variable as a string
	for (var i = 0; i < links.length; i++){
		if (links[i].id == link_id){
			id_link = "<a id='"+links[i].id+"' href='"+links[i].url+"'>"+links[i].name+"</a>\n";
		}
	}
	res.writeHead(200, {'Content-Type': 'text/plain'});
	//display the link with specified id to user
	res.end(id_link + '\n');

}

//create link and add to link array
function createLink(req, res, link_id) {
	res.writeHead(200, {'Content-Type': 'text/plain'});
	var body = '';
	//stores the data string into the body variable
	req.on('data', function(DATA) { // on is an event listener
		body += DATA;
	});
	req.on('end', function() {
		//parses body into an object
		var params = qs.parse(body);
		//create new Link instance using the params object
		var newLink = new Link(params.name, params.url);
		//add new Link instance into links array
		links.push(newLink);
		console.log(links);
		//display to user that a link was added
		res.end('Added Link\n');
	});
}

//update a link with an already used id
function updateLink(req, res, link_id) {
	res.writeHead(200, {'Content-Type': 'text/plain'});
		var body = '';
	//stores the data string into the body variable
	req.on('data', function(DATA) { // on is an event listener
		body += DATA;
		console.log(body);
	});
	req.on('end', function() {
		//parses body into an object
		var params = qs.parse(body);
		//loop through links array to find the link that has the user specified id
		for (var i = 0; i < links.length; i++){
			//if link with specified id is found, replace current values 
			if (links[i].id == link_id){
					links[i].id = link_id;
					links[i].name = params.name;
					links[i].url = params.url;
			}
		}
		console.log(links);
		//display to user that a link was updated
		res.end('Updated Link\n');
	});
}

//delete link with specified id from the links array
function deleteLink(req, res, link_id) {
	//loop through links array to find the link with the specified id
	for (var i = 0; i < links.length; i++){
		//if link with specified id is found, remove from array
		if (links[i].id == link_id){
			links.splice(i, 1);
		}
	}
	console.log(links);
	res.writeHead(200, {'Content-Type': 'text/plain'});
	//display to user that link was deleted
	res.end('Deleted Link\n');
}

//will route depending on the method
function allLinks(req, res, link_id) {
	res.writeHead(200, {
		'Content-Type': 'text/plain'
	});
	//if trying to find all links or a link by id
	if (req.method == 'GET') {
		//if no id specified, get all links
		if (link_id === undefined){
			findAllLinks(req, res, link_id);
		//if id is specified, get specified link
		} else {
			console.log(link_id);
			findLinkById(req, res, link_id);
		}
	//if creating new link
	} else if (req.method == 'POST') {
		createLink(req, res, link_id);
	//if updating link
	} else if (req.method == 'PUT') {
		updateLink(req, res, link_id);
	//if deleting link
	} else if (req.method == 'DELETE') {
		deleteLink(req, res, link_id);
	} else {
		res.end('Invalid method\n');
	}
}

//displays page not found if user types in incorrectly
function show404(req, res) {
	res.writeHead(404, {
		'Content-Type': 'text/plain'
	});
	res.end('Page Not Found! ><\n');
}


http.createServer(function(req, res) {
	var url_parts = url.parse(req.url);
	//splits the url at the / into an array
	var split_url = url_parts.pathname.split("/");
	//stores the /links/
	var resource = "/"+split_url[1]+"/";
	//stores the id
	var link_id = split_url[2];
	console.log(link_id);
	//based on the url, do something
	switch (resource) {
		case '/links/':
			allLinks(req, res, link_id);
			break;
		default:
			show404(req, res);
	}
}).listen(1337, '127.0.0.1');
console.log('Server running at http://127.0.0.1:1337/');