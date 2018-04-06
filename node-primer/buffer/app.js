/**
 * Created by chengyong.lin on 18/4/5.
 */

'use strict';

const { Buffer } = require('buffer');

let buf = Buffer.from('runoob');



// 输出 72756e6f6f62
console.log(buf);

// 输出 cnVub29i
console.log(buf.toString('base64'));