/**
 * Created by chengyong.lin on 18/4/12.
 */

'use strict';
var request = require('./requestHandler');

function router(pathname, req, res) {
    var handler = request[pathname];
    if(handler){
        handler(req, res)
    }else {
        console.log("No request handle found for" + pathname);
        res.writeHead(404, {"Content-Type": "text/plain"});
        res.write("404 Not Found");
        res.end();
    }
}



exports.router = router;