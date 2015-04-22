'use strict';

var openurl = require("openurl");
var request = require("request");
var Spinner = require('cli-spinner').Spinner;

var getDocumentUrl = function(packageName, site, cb) {
  var docUrl = "https://www.npmjs.com/package/" + packageName;
  var registryUrl = "http://registry.npmjs.org/" + packageName;

  request(registryUrl, function(err, res, body) {
    if (err) return cb(err);

    if (body == '') {
      return cb('Can not found package: ' + packageName);
    }

    if (site == 'npmjs') {
      return cb(null, docUrl);
    }

    var npmObj = JSON.parse(body);
    if (npmObj.error) {
      return cb(npmObj.error);
    }

    if (site == 'github') {
      var githubUrl = /.*github\.com[:\/]([\w-]+)\/([\w-]+).*/;

      if (npmObj.repository && npmObj.repository.url && npmObj.repository.url.match(githubUrl)) {
        docUrl = npmObj.repository.url.replace(githubUrl, 'https://github.com/$1/$2');
        return cb(null, docUrl);
      } else {
        return cb('Can not found doc in github, try `open-doc ' + packageName + '` instead.')
      }
    }

    if (npmObj.homepage && npmObj.homepage.match(/^https?:\/\//)) {
      docUrl = npmObj.homepage;
    }

    cb(null, docUrl);
  });
};

module.exports = function(packageName, site) {
  var spinner = new Spinner('%s');
  spinner.setSpinnerString('|/-\\');
  spinner.start();

  getDocumentUrl(packageName, site, function(err, url) {
    spinner.stop('clean');
    
    if (err) {
      console.log(err);
      process.exit(1);
    }

    console.log('=> ' + url);
    openurl.open(url);
  });
};