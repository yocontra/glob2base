var path = require('path');

var flatten2d = function(arr){
  return arr.map(function(s, idx) {
    if (typeof s === 'string' && idx !== arr.length-1) {
      return s;
    } else {
      return '';
    }
  });
};

module.exports = function(glob) {
  var cwd = (glob.options && glob.options.cwd) ? glob.options.cwd : process.cwd();
  var rules = glob.minimatch.set[0];
  var basePath = path.normalize(flatten2d(rules).join(path.sep));
  return basePath;
};