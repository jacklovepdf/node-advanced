/*
* the difference of path.join and path.resolve
* @author jacklin
* @date 2018-07-10
*
* */

const path = require("path");

let path1 = path.join('/foo', 'bar', 'baz/zxcv', 'abcd');
console.log("path1=====>", path1);
// mac: "/foo/bar/baz/zxcv/abcd"
// win:

let path2 = path.join('foo', 'bar', 'baz/zxcv', '../abcd');
console.log("path2=====>", path2);
// mac: "foo/bar/baz/abcd"
// win:

let path3 = path.resolve('/foo', 'bar', 'baz/zxcv', 'abcd');
console.log("path3=====>", path3);
// mac: "/foo/bar/baz/zxcv/abcd"
// win:

let path4 = path.resolve('foo', 'bar', 'baz/zxcv', '../abcd');
console.log("path4=====>", path4);
// mac: "/Users/linchengyong/jacklin/project/node-advanced/node-primer/foo/bar/baz/abcd"
// win:

let path5 = path.resolve('foo', 'bar', '/baz/zxcv', '../abcd');
console.log("path5=====>", path5);
// mac: "/baz/abcd"
// win:




