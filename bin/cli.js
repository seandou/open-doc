#!/usr/bin/env node

'use strict';

var program = require('commander');
var openDoc = require('../lib/open-doc.js');
var appInfo = require('./../package.json');

program
  .version(appInfo.version)
  .usage('[options] <package>')
  .option('-n, --npm', 'open document page in npmjs.com')
  .option('-g, --github', 'open document page in github.com')
  .parse(process.argv);

if (program.args.length != 1) {
  program.help();
}

var site = 'default';

if (program.npm) {
  site = 'npmjs';
}

if (program.github) {
  site = 'github';
}

openDoc(program.args[0], site);
