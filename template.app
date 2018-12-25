var	util = require('util');

try {
  require('{{{lib}}}');
  require('{{{app}}}');
  success('startup');
} catch (e) {
  failure(e);
  failure('exit');
}

function success() {
  process.stdout.write('\033[32m' + '[console-inject] ' + util.format.apply(this, arguments) + '\033[0m' + '\n'); 
}

function failure() {
  process.stdout.write('\033[91m' + '[console-inject] ' + util.format.apply(this, arguments) + '\033[0m' + '\n'); 
}
