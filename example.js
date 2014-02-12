var http = require('http');
var url = require('url');
var qs = require('querystring');

function Link(name, url) {
	this.name = name;
	this.url = url;
}

var links = [];

function index(req, res){
	var temp = "";
	for (var i = 0; i < links.length; i++){
		temp += "<a href='"+links[i].url+"'>"+links[i].name+"</a>\n";

	}
	res.writeHead(200, {'Content-Type': 'text/plain'});
	res.end(temp + '\n');

}

function add(req, res){
	res.writeHead(200, {'Content-Type': 'text/plain'});
	if(req.method == 'POST'){
		var body = '';
		req.on('data',function(DATA){// on is an event listener
			body += DATA;
		});
		req.on('end', function(){
			var params = qs.parse(body);
			console.log(params);
			links.push(params);
			res.end('Added Link\n');
		});
	} else {
		res.end('Invalid POST\n');
	}
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
		case '/add':
			add(req, res);
			break;
		default: show404(req, res);
	}
}).listen(1337, '127.0.0.1');
console.log('Server running at http://127.0.0.1:1337/');