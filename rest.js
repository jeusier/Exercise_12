var http = require('http');
var url = require('url');
var qs = require('querystring');
//var id_length = 0;

function Link(name, url) {
	this.name = name;
	this.url = url;
	this.id = links.length;

}

var links = [];

function findAllLinks(req, res) {
	console.log(links);
	var temp = "";
	for (var i = 0; i < links.length; i++){
		temp += "<a id='"+links[i].id+"' href='"+links[i].url+"'>"+links[i].name+"</a>\n";

	}
	res.writeHead(200, {'Content-Type': 'text/plain'});
	res.end(temp + '\n');

}

function findLinkById(req, res, link_id) {
	var id_link = "<a id='"+links[link_id].id+"' href='"+links[link_id].url+"'>"+links[link_id].name+"</a>\n";

	res.writeHead(200, {'Content-Type': 'text/plain'});
	res.end(id_link + '\n');

}

function createLink(req, res, link_id) {
	console.log(links.indexOf(link_id));
	var body = '';
	req.on('data', function(DATA) { // on is an event listener
		body += DATA;
	});
	req.on('end', function() {
		//console.log(body);
		var params = qs.parse(body);
		//console.log(params);
		var newLink = new Link(params.name, params.url);
		//console.log(newLink);
		links.push(newLink);
		console.log(links);
		res.end('Added Link\n');
	});
}

function updateLink(req, res, link_id) {
		var body = '';
	req.on('data', function(DATA) { // on is an event listener
		body += DATA;
	});
	req.on('end', function() {
		//console.log(body);
		var params = qs.parse(body);
		//console.log(params);
		var newLink = new Link(params.name, params.url);
		//console.log(newLink);
		links.push(newLink);
		console.log(links);
		res.end('Added Link\n');
	});
}

function deleteLink(req, res, link_id) {
	//console.log(links.indexOf(link_id));
	//var linkToDelete = links.indexOf(link_id);
	//console.log(links.indexOf(link_id));
	//console.log(links);
	links.splice(link_id, 1);
	console.log(links);
	res.writeHead(200, {'Content-Type': 'text/plain'});
	res.end('Deleted Link\n');

}


function allLinks(req, res, link_id) {
	res.writeHead(200, {
		'Content-Type': 'text/plain'
	});
	if (req.method == 'GET') {
		if (link_id === undefined){
			findAllLinks(req, res, link_id);
		} else {
			console.log(link_id);
			findLinkById(req, res, link_id);
		}
	} else if (req.method == 'POST') {
		createLink(req, res, link_id);
	} else if (req.method == 'PUT') {
		updateLink(req, res, link_id);
	} else if (req.method == 'DELETE') {
		deleteLink(req, res, link_id);
	} else {
		res.end('Invalid POST\n');
	}
}


function show404(req, res) {
	res.writeHead(404, {
		'Content-Type': 'text/plain'
	});
	res.end('Page Not Found! ><\n');
}

http.createServer(function(req, res) {
	var url_parts = url.parse(req.url);
	var split_url = url_parts.pathname.split("/");
	var resource = "/"+split_url[1]+"/";
	var link_id = split_url[2];
	console.log(link_id);

	switch (resource) {
		case '/links/':
			allLinks(req, res, link_id);
			break;
		default:
			show404(req, res);
	}
}).listen(1337, '127.0.0.1');
console.log('Server running at http://127.0.0.1:1337/');