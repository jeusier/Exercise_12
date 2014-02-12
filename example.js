var http = require('http');
var url = require('url');
function index(req, res){
	res.writeHead(200, {'Content-Type': 'text/plain'});
	res.end('Hello Index\n');
}
function jason(req, res){
	res.writeHead(200, {'Content-Type': 'text/plain'});
	res.end('Hello Jason\n');
}
http.createServer(function (req, res) {
	var url_parts = url.parse(req.url);
	switch(url_parts.pathname){
		case '/':
			index(req, res);
			break;
		case '/jason':
			jason(req, res);
			break;
	}
}).listen(1337, '127.0.0.1');
console.log('Server running at http://127.0.0.1:1337/');