let net = require('net');
let netServer = net.createServer(function (conn) {
    console.log("net handler");
});
netServer.listen(8080, function () {
    console.log("net server start at port: 8080")
});