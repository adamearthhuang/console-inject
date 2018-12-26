var	util = require('util');

try {
  require('{{{lib}}}');
  require('{{{app}}}');
  green('startup');
} catch (e) {
  red(e);
  red('exit');
}

function green() {
  process.stdout.write('\033[32m' + '[console-inject] ' + util.format.apply(this, arguments) + '\033[0m' + '\n'); 
}

function red() {
  process.stdout.write('\033[91m' + '[console-inject] ' + util.format.apply(this, arguments) + '\033[0m' + '\n'); 
}
