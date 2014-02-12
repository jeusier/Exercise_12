var http = require('http');
var url = require('url');
var qs = require('querystring');

function Link(name, url) {
	this.name = name;
	this.url = url;
	this.id = links.length;

}

var links = [];

function findAllLinks(req, res) {
	var temp = "";
	for (var i = 0; i < links.length; i++){
		temp += "<a href='"+links[i].url+"'>"+links[i].name+"</a>\n";

	}
	res.writeHead(200, {'Content-Type': 'text/plain'});
	res.end(temp + '\n');

}

function findLinkById(req, res, link_id) {
	var id_link = "<a href='"+links[link_id].url+"'>"+links[link_id].name+"</a>\n";

	res.writeHead(200, {'Content-Type': 'text/plain'});
	res.end(id_link + '\n');

}

function createLink(req, res) {
	var body = '';
	req.on('data', function(DATA) { // on is an event listener
		body += DATA;
	});
	req.on('end', function() {
		console.log(body);
		var params = qs.parse(body);
		console.log(params);
		var newLink = new Link(params.name, params.url);
		console.log(newLink);
		links.push(newLink);
		res.end('Added Link\n');
	});
}

function updateLink(req, res, link_id) {
		var body = '';
	req.on('data', function(DATA) { // on is an event listener
		body += DATA;
	});
	req.on('end', function() {
		console.log(body);
		var params = qs.parse(body);
		console.log(params);
		var newLink = new Link(params.name, params.url);
		console.log(newLink);
		links.push(newLink);
		res.end('Added Link\n');
	});
}

function deleteLink(req, res, link_id) {
		var body = '';
	req.on('data', function(DATA) { // on is an event listener
		body += DATA;
	});
	req.on('end', function() {
		console.log(body);
		var params = qs.parse(body);
		console.log(params);
		var newLink = new Link(params.name, params.url);
		console.log(newLink);
		links.push(newLink);
		res.end('Added Link\n');
	});
}

function allLinks(req, res, link_id) {
	res.writeHead(200, {
		'Content-Type': 'text/plain'
	});
	if (req.method == 'GET') {
		if (link_id == 'undefined'){
			findAllLinks(req, res);
		} else {
			findLinkById(req, res, link_id);
		}
	} else if (req.method == 'POST') {
		createLink(req, res);
	} else if (req.method == 'PUT') {
		updateLink(req, res);
	} else if (req.method == 'DELETE') {
		deleteLink(req, res);
	} else {
		res.end('Invalid POST\n');
	}
}



function linksById(req, res) {
	res.writeHead(200, {
		'Content-Type': 'text/plain'
	});
	if (req.method == 'GET') {
		var temp = "";
		for (var i = 0; i < links.length; i++) {
			temp += "<a id='" + i + "' href='" + links[i].url + "'>" + links[i].name + "</a>\n";
		}
		res.writeHead(200, {
			'Content-Type': 'text/plain'
		});
		res.end(temp + '\n');
	}



	if (req.method == 'POST') {
		var body = '';
		req.on('data', function(DATA) { // on is an event listener
			body += DATA;
		});
		req.on('end', function() {
			var params = qs.parse(body);
			console.log(params);
			links.push(params);
			res.end('Added Link\n');
		});
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

	switch (resource) {
		case '/links/':
			allLinks(req, res, link_id);
			break;
		default:
			show404(req, res);
	}
}).listen(1337, '127.0.0.1');
console.log('Server running at http://127.0.0.1:1337/');