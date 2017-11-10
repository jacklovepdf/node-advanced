var cheerio = require('cheerio');
var superagent = require('superagent');
var async = require('async');
var url = require('url');

var concurrencyCount = 10; //并发连接数
var cNodeUrl = 'https://cnodejs.org/';

superagent.get(cNodeUrl).end(function (err, res) {
    if(err){
        return console.error(err);
    }
    var topicUrls = [];
    var $ = cheerio.load(res.text);
    $('#topic_list .topic_title').map(function (item, index) {
        var $index = $(index);
        var href = url.resolve(cNodeUrl, $index.attr('href'));
        topicUrls.push(href);
    });

    function fetchUrl(url, callback) {
        superagent.get(url).end(function (err, res) {
            if(err){
                return console.error(err);
            }
            var $ = cheerio.load(res.text);
            var arrItem = {
                title: $('.topic_full_title').text().trim(),
                href: url,
                comment1: $('.reply_content').eq(0).text().trim()
            };
            callback(null, arrItem);
        });
    }
    async.mapLimit(topicUrls, concurrencyCount, function (url, callback) {
        fetchUrl(url, callback);
    }, function (err, result) {
        if(err){
            return console.error(err);
        }
        console.log(result);
    });

});