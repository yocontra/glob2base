'use strict';

var path = require('path');

var flattenGlob = function(arr){
  var out = [];
  var flat = true;
  for(var i = 0; i < arr.length; i++) {
    if (typeof arr[i] !== 'string') {
      flat = false;
      break;
    }
    out.push(arr[i]);
  }

  // last one is a file or specific dir
  // so we pop it off
  if (flat) {
    out.pop();
  }
  return out;
};

var findIndex = function (array, callback) {
  var index = -1,
      length = array ? array.length : 0;

  while (++index < length) {
    if (callback(array[index], index)) {
      return index;
    }
  }
  return -1;
};

var flattenExpansion = function(set) {
  var first = set[0];
  var toCompare = set.slice(1);

  // find index where the diff is
  var idx = findIndex(first, function(v, idx){
    if (typeof v !== 'string') {
      return true;
    }

    return toCompare.some(function(arr){
      return v !== arr[idx];
    });
  });

  return first.slice(0, idx);
};

var setToBase = function(set) {
  // normal something/*.js
  if (set.length <= 1) {
    return flattenGlob(set[0]);
  }
  // has expansion
  return flattenExpansion(set);
};

module.exports = function(glob) {
  var set = glob.minimatch.set;
  var baseParts = setToBase(set);
  var basePath = path.normalize(baseParts.join(path.sep))+path.sep;
  return basePath;
};
