#!/usr/bin/env node

'use strict';

var program = require('commander');
var openDoc = require('../lib/open-doc.js');
var appInfo = require('./../package.json');

program
  .version(appInfo.version)
  .usage('[options] <package>')
  .option('-n, --npm', 'Open document page of npmjs.com')
  .option('-g, --github', 'Open document page of github.com')
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
