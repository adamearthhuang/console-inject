#!/usr/bin/env node
var fs = require('fs');
var path = require('path');
var handlebars = require('handlebars');
var shelljs = require('shelljs');

var appFileName = '';
for (var i = 2; i < process.argv.length; i++) {
  if (path.extname(process.argv[i]) === '.js') {
    appFileName = process.argv[i];
    if (appFileName.indexOf('./') !== 0) {
      appFileName = './' + appFileName;
    }
    process.argv[i] = '.app';
    break;
  }
}

fs.writeFileSync('.app', handlebars.compile(fs.readFileSync(path.join(__dirname, 'template.app')).toString())({ 
  app: appFileName
}));

shelljs.exec(process.argv.splice(2).join(' '));
