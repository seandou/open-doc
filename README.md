open-doc [![NPM version][npm-version-image]][npm-url]
=========

Quickly open npm package document in browser.

[![NPM version][npm-download-image]][npm-url]

Screenshot
------------
![usage](https://raw.githubusercontent.com/seandou/open-doc/master/screenshot.gif)


Installation
-------------

```
npm install -g open-doc
```

Usage
------

```
Usage: open-doc [options] <package>

Options:

  -h, --help     output usage information
  -V, --version  output the version number
  -n, --npm      Open document page in npmjs.com
  -g, --github   Open document page in github.com
```

### samples

- `open-doc express`

    open express offcial site`http://expressjs.com/`

- `open-doc express --npm`

    open npm package `https://www.npmjs.com/package/express`

- `open-doc express --github`

    open github profile `https://github.com/strongloop/express`

- `open-doc .`

    open current homepage according package.json


License
-------

(MIT License)

[npm-version-image]: https://img.shields.io/npm/v/open-doc.svg?style=flat-square
[npm-download-image]: https://nodei.co/npm/open-doc.png?downloads=true
[npm-url]: https://npmjs.org/package/open-doc
