'use strict';

var execSync = require('child_process').execSync;
var openurl = require("openurl");
var request = require("request");
var Spinner = require('cli-spinner').Spinner;

var githubExp = /.*github\.com[:\/]([\w-]+)\/([\w-]+).*/;

var formatUrl = function(uri) {
  if (uri && uri.match(githubExp)) {
    return uri.replace(githubExp, 'https://github.com/$1/$2');
  } else {
    return null;
  }
};

var getDocumentUrl = function(packageName, site, cb) {
  var docUrl = "https://www.npmjs.com/package/" + packageName;
  var registryUrl = "http://registry.npmjs.org/" + packageName;
  
  if (packageName == '.') {
    try {
      var buffer = execSync('git config --get remote.origin.url');
      docUrl = formatUrl(buffer.toString('utf8').replace(/[\n\r]/g, ''));
      if (docUrl) {
        return cb(null, docUrl);
      } else {
        return cb('Can not recognize url: ' + docUrl);
      }
    } catch(err) {
      return cb('Current directory is not a git repo');
    }
  }

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
      if (npmObj.repository && npmObj.repository.url) {
        docUrl = formatUrl(npmObj.repository.url);
        if (docUrl) {
          return cb(null, docUrl);
        } else {
          return cb('Can not recognize url: ' + docUrl);
        }
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