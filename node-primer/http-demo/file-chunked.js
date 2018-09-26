let http = require('http');
let fs = require('fs');

let server = http.createServer(function(req, res){
    res.writeHead(200, {'Content-Type': 'image/jpg'});
    // let readStream = fs.createReadStream('./image.jpg');
    // readStream.on('data', function (data) {
    //     res.write(data);
    // });
    // readStream.on('end', function () {
    //     res.end();
    // })
    fs.createReadStream('./image.jpg').pipe(res)
});
server.listen(8080);