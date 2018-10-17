let http = require('http');

// server is instance of http.Server;
// The requestListener is a function which is automatically added to the 'request' event;
// req:  <http.IncomingMessage>
//
//
//
//require('url').parse(request.url)
//
// res:  <http.ServerResponse>
//
//
// Note that there may be multiple requests per connection (in the case of HTTP Keep-Alive connections).
let server = http.createServer(function(req, res){
    res.writeHead(200);
    res.write('hello world!');
    setTimeout(function(){
        res.end('hello');
    }, 5000)
});
server.listen(8080);