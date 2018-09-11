var add = require('./add');
var multi = require('./multiple');

module.exports = function (a, b) {
    var sum = add(a, b) + multi(a, b);
    return sum;
};