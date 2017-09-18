/**
 * Created by chengyong.lin on 16/12/13.
 * 入口文件
 */

var server = require('./server');
var router = require('./router');
var handler =require('./requestHandlers');

server.start(router.route, handler.handler);