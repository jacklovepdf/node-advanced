var express = require('express');
var utility = require('utility');
var app = express();

app.get('/', function (req, res) {
    var q = req.query.q;
    if(typeof q !== "undefined"){
        var md5Val = utility.md5(q);
        res.send(md5Val);
    }
});

app.listen(8081, function (req, res) {
    console.log("app is running at port 8081");
});