var path = require('path');

var flatten2d = function(arr){
  var out = [];
  for(var i = 0; i < arr.length; i++) {
    if (typeof arr[i] !== 'string') {
      break; // hit a glob, done now
    }
    out.push(arr[i]);
  }
  return out;
};

module.exports = function(glob) {
  var cwd = (glob.options && glob.options.cwd) ? glob.options.cwd : process.cwd();
  var rules = glob.minimatch.set[0];
  var basePath = path.normalize(flatten2d(rules).join(path.sep))+path.sep;
  return basePath;
};