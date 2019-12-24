let fs = require('fs');
let path = require('path');
let dataPath = path.join(__dirname, 'data.js');
let data = fs.readFileSync(dataPath, {encoding: 'utf8'});
console.log('before data=====>', data);
data = JSON.parse(data);
console.log('after data=====>', data);
