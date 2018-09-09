#!/usr/bin/env node

var md5 = require('md5');
var colors = require('colors');
var program = require('commander');
program
	.version('v' + require('../package.json').version)
	.description('a md5 cli tool.')
	.arguments('[string]')
	.option('-s, --string', 'input a string')
	.parse(process.argv);

if (program.args.length == 1) {
	console.log(program.args[0] + ' > MD5 Output:'.rainbow);
	console.log(md5(program.args[0]).underline.red);
} else if (program.string) {
	console.log(program.string + ' > MD5 Output:'.rainbow);
	console.log(md5(program.string).underline.red);
} else {
	console.log('ERROR input!!!'.rainbow);
}