/**
 * Created by chengyong.lin on 18/4/12.
 */

'use strict';

var http = require('http');
var url = require('url');
var route = require('./router');

function start(port=8000) {
    var onRequest = function (req, res) {
            var pathname = url.parse(req.url).pathname;
            route.router(pathname, req, res);
        },
        server = http.createServer(onRequest);

    server.listen(port);
    console.log("server is listen at port: 8000");
}

exports.start = start;