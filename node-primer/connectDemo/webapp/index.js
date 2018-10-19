/**
 * app.js
 * a simple connect app
 * Created by chengyong.lin on 17/11/9.
 */

'use strict';

var connectHello, server, logger,
    http = require('http'),
    connect = require('connect'),
    app = connect(),
    bodyText = 'Hello world';

connectHello =  function (request, response, next) {
    response.writeHead('content-length', bodyText.length);
    response.end(bodyText);
};

logger = function (request, response, next) {
    console.log("request.headers", request.headers);
    next();
};

app.use(logger).use( connectHello );
server = http.createServer(app);
server.listen(3000);

console.log("server is starting at port: 3000");
