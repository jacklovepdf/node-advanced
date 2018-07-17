let path = require('path');
let aPath = path.join(__dirname, 'a.js');
console.log("aPath====>", aPath);

let sum = require(aPath);

let result = sum(3,4);
console.log("result=====>", result);