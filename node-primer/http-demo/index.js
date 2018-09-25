let http = require('http');

let server = http.createServer(function(req, res){
    res.writeHead(200);
    res.write('hello world!');
    setTimeout(function(){
        res.end('hello');
    }, 5000)
});
server.listen(8080);