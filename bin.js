#!/usr/bin/env node
var fs = require('fs');
var path = require('path');
var	util = require('util');
var handlebars = require('handlebars');
var shelljs = require('shelljs');

try {
  var libPath = process.argv[1];
  var argv = process.argv.splice(2); 

  success('console-inject ' + argv.join(' '));
  success('1.0.3');
  success('injecting...');

  var appFileName = '', inject = false;
  for (var i = 0; i < argv.length; i++) {
    if (path.extname(argv[i]) === '.js') {
      appFileName = argv[i];
      if (appFileName.indexOf('./') !== 0) {
        appFileName = './' + appFileName;
      }
      argv[i] = '.app';
      inject = true;
      break;
    }
  }

  if (inject) {
    success('inject successed');

    // good: console-inject node good.js -> node .app
    // bad: console-inject node bad -> node bad
    var cmd = argv.join(' ');

    fs.writeFileSync('.app', handlebars.compile(fs.readFileSync(path.join(__dirname, 'template.app')).toString())({ 
      lib: path.dirname(libPath).replace(/\\/g, '/'),
      app: appFileName
    }));

    success('generate file .app');
    success(cmd);
    success('starting...');

    shelljs.exec(cmd);
  } else {
    failure('JS file is undefined');
    failure('inject failed');
  }

} catch (e) {
  failure(e);
  failure('inject failed');
}

function success() {
  process.stdout.write('\033[32m' + '[console-inject] ' + util.format.apply(this, arguments) + '\033[0m' + '\n'); 
}

function failure() {
  process.stdout.write('\033[91m' + '[console-inject] ' + util.format.apply(this, arguments) + '\033[0m' + '\n'); 
}