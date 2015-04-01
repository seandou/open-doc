#!/usr/bin/env node

'use strict';

var printHelp = function() {
  var helpDoc = [
    "",
    "Usage: open-doc [package]",
    "",
    "Example:",
    "",
    "  open-doc gulp",
    ""
  ].join("\n");
  
  console.log(helpDoc);
  process.exit(0);
};

function main() {
  if (process.argv.length < 3) {
    printHelp();
  }

  
}

main();
