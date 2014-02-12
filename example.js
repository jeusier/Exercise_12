var http = require('http');
var url = require('url');

function Link(name, url) {
	this.name = name;
	this.url = url;
}

var links = [
	new Link("Youtube", "youtube.com"),
	new Link("Google", "google.com"),
	new Link("Reddit", "reddit.com")
	];

function index(req, res){
	var temp = "";
	for (var i = 0; i < links.length; i++){
		temp += "<a href='"+links[i].url+"'>"+links[i].name+"</a>\n";

	}
	res.writeHead(200, {'Content-Type': 'text/plain'});
	res.end(temp + '\n');

}

function show404(req, res){
	res.writeHead(404, {'Content-Type': 'text/plain'});
	res.end('Page Not Found! ><\n');
}

http.createServer(function (req, res) {
	var url_parts = url.parse(req.url);
	switch(url_parts.pathname){
		case '/':
			index(req, res);
			break;
		default: show404(req, res);
	}
}).listen(1337, '127.0.0.1');
console.log('Server running at http://127.0.0.1:1337/');