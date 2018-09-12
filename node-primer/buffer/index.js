const { Buffer } = require('buffer');
//base64是一种用ascii字符书写二进制数据的方式；因此可以用简单的英文字符来表示图像这样复杂的资源（但是会占用更多的磁盘空间）；
//在nodejs中，绝大部分进行io操作的api都是用buffer来接受和返回数据的；
let mybuffer = new Buffer('==ii1j2i3h1i23h', 'base64');
console.log(mybuffer);
require('fs').writeFile('logo.gif', mybuffer, function (err) {
    if(err){console.error(err)}
});