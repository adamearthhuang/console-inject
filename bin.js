#!/usr/bin/env node
var fs = require('fs');
var path = require('path');
var	util = require('util');
var handlebars = require('handlebars');
var shelljs = require('shelljs');

try {
  var libPath = process.argv[1];
  var argv = process.argv.splice(2); 

  yellow('console-inject ' + argv.join(' '));
  yellow('1.0.8');
  yellow('injecting...');

  var appPath = '', isJSFile = false;
  for (var i = 0; i < argv.length; i++) {
    if (path.extname(argv[i]) === '.js') {
      appPath = argv[i];
      argv[i] = '.app';
      isJSFile = true;
      break;
    }
  }

  if (isJSFile) {
    green('recognized main file "' + appPath + '"');

    // console-inject node app.js -> node .app
    var cmd = argv.join(' ');

    fs.writeFileSync('.app', handlebars.compile(fs.readFileSync(path.join(__dirname, 'template.app')).toString())({ 
      lib: path.dirname(libPath).replace(/\\/g, '/'),
      app: appPath.indexOf('./') === 0 ? appPath : './' + appPath
    }));

    green('generated main file ".app"');
    green('inject successed');
    yellow(cmd);
    yellow('starting...');

    shelljs.exec(cmd);
  } else {
    red('main file is not recognized');
    red('inject failed');
  }

} catch (e) {
  red(e);
  red('inject failed');
}

function yellow() {
  process.stdout.write('\033[33m' + '[console-inject] ' + util.format.apply(this, arguments) + '\033[0m' + '\n'); 
}

function green() {
  process.stdout.write('\033[32m' + '[console-inject] ' + util.format.apply(this, arguments) + '\033[0m' + '\n'); 
}

function red() {
  process.stdout.write('\033[91m' + '[console-inject] ' + util.format.apply(this, arguments) + '\033[0m' + '\n'); 
}