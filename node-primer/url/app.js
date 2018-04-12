/**
 * Created by chengyong.lin on 18/4/12.
 */

'use strict';

const { URL } = require('url');
const myURL =
    new URL('https://user:pass@sub.host.com:8080/p/a/t/h?query=string#hash');

console.log("myURL=====>", myURL);