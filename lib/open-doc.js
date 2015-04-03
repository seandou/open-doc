'use strict';

var openurl = require("openurl");
var request = require("request");
var Spinner = require('cli-spinner').Spinner;

var getDocumentUrl = function(packageName, cb) {
  var docUrl = "https://www.npmjs.com/package/" + packageName;
  var registryUrl = "http://registry.npmjs.org/" + packageName;

  var spinner = new Spinner('%s');
  spinner.setSpinnerString('|/-\\');
  spinner.start();

  request(registryUrl, function(err, res, body) {
    spinner.stop('clean');
    if (err) return cb(err);

    if (body == '') {
      return cb('Can not found package: ' + packageName);
    }

    var npmObj = JSON.parse(body);
    if (npmObj.error) {
      return cb(npmObj.error);
    }

    if (npmObj.homepage && npmObj.homepage.match(/^https?:\/\//)) {
      docUrl = npmObj.homepage;
    }

    cb(null, docUrl);
  });
};

module.exports = function(packageName) {
  getDocumentUrl(packageName, function(err, url) {
    if (err) {
      console.log(err);
      process.exit(1);
    }

    console.log('=> ' + url);
    openurl.open(url);
  });
};