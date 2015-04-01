#!/usr/bin/env node

'use strict';

var openDoc = require('../lib/open-doc.js');

var printHelp = function() {
  var help = [
    "",
    "Usage: open-doc [package]",
    "",
    "Example:",
    "",
    "  open-doc gulp",
    ""
  ].join("\n");
  
  console.log(help);
  process.exit(0);
};

function main() {
  if (process.argv.length < 3) {
    printHelp();
  }

  var packageName = process.argv[2];
  openDoc(packageName);
}

main();
