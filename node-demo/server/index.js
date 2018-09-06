const http = require('http');
const router = require('./src/router');


const server = http.createServer(function (req, res) {
    res.writeHead(200, {'content-Type': 'text/html'});
    res.end('<h1>hello world</h1>');
});

server.listen(8888);