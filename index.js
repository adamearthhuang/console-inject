
var	util = require('util');
var callsite = require('callsite');

// ASCII Code 
var colors = {
  NONE: '\033[0m', // none
  LOG: '\033[0m', // none
  INFO: '\033[32m', // green
  WARN: '\033[33m', // yellow
  TRACE: '\033[34m', // blue
  DEBUG: '\033[36m', // cyan
  ERROR: '\033[91m', // red
}

global.console.log = function () {
  write('LOG', util.format.apply(this, arguments));
};

global.console.info = function () {
  write('INFO', util.format.apply(this, arguments));
};

global.console.warn = function () {
  write('WARN', util.format.apply(this, arguments));
};

global.console.trace = function () {
  write('TRACE', util.format.apply(this, arguments));
};

global.console.debug = function () {
  write('DEBUG', util.format.apply(this, arguments));
};

global.console.error = function () {
  write('ERROR', util.format.apply(this, arguments));
};

function write(type, string) {
  var stack = callsite();

  process.stdout.write(colors[type] + util.format('[%s] [%s] %s:%d - %s', now(), type, stack[2].getFileName(), stack[2].getLineNumber(), string) + colors.NONE + '\n');
  
  if (type === 'TRACE') {
    process.stdout.write(colors.TRACE + '    at ' + stack.splice(2).join('\n    at ') + colors.NONE + '\n');
  }  
}

function now() {  
  var date = new Date();

  var year = date.getFullYear();  

  var month = date.getMonth() + 1;  
  month = month < 10 ? ('0' + month) : month;  

  var day = date.getDate();  
  day = day < 10 ? ('0' + day) : day;

  var hour = date.getHours();
  hour = hour < 10 ? ('0' + hour) : hour;

  var minute = date.getMinutes();
  minute = minute < 10 ? ('0' + minute) : minute;  
  
  var second = date.getSeconds();
  second = second < 10 ? ('0' + second) : second; 
  
  return year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second;  
}

