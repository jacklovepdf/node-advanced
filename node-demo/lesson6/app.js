var express = require('express');
var cheerio = require('cheerio');
var superagent = require('superagent');
var eventproxy =  require('eventproxy');
var url = require('url');
var cnodeUrl = 'https://cnodejs.org/';

superagent.get(cnodeUrl).end(function (err, res) {
    if(err){
        return console.error(err);
    }
    var topicUrls = [];
    var num = 4; //每次分析url个数
    var count = 0;
    var allUrlContent = [];
    var $ = cheerio.load(res.text);
    $('#topic_list .topic_title').map(function (item, index) {
        var $index = $(index);
        var href = url.resolve(cnodeUrl, $index.attr('href'));
        topicUrls.push(href);
    });
    var eventProxy = new eventproxy();

    var topicUrlsLen = topicUrls.length; //总的要抓取的URL数
    var arrUrl = topicUrls.slice(0, num);
    var arrUrlLen = arrUrl.length;


    eventProxy.after('get_topic_content', arrUrlLen, function (data) {
        var topicUrlContent = data.map(function (itemPair) {
            var url = itemPair[0];
            var htmlStr = itemPair[1];
            var $ = cheerio.load(htmlStr);
            return {
                title: $('.topic_full_title').text().trim(),
                href: url,
                comment1: $('.reply_content').eq(0).text().trim()
            }
        });
        console.log("topicUrlContent==========>", topicUrlContent);
    });

    arrUrl.map(function (url) {
        superagent.get(url).end(function (err, res) {
            if(err){
                return console.log("抓取网页失败：", err);
            }
            eventProxy.emit('get_topic_content', [url, res.text])
        })
    })
});
