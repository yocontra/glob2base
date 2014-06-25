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

// find index where the diff is
var diffIndexAt = function (first, toCompare) {
  var firstLength     = first.length,
      toCompareLength = toCompare.length;

  for (var idx = 0, v1 = null; idx < firstLength; idx++) {
    v1 = first[idx];
    if (typeof v1 !== 'string') { return idx; }

    for (var j = 0; j < toCompareLength; j++) {
      if (v1 !== toCompare[j][idx]) {
        return idx;
      }
    }
  }
  return -1;
};

var setToBase = function(set) {
  var first = set[0];
  // normal something/*.js
  if (set.length <= 1) {
    return flattenGlob(first);
  }
  // has expansion
  var toCompare = set.slice(1);

  return first.slice(0, diffIndexAt(first, toCompare));
};

module.exports = function(glob) {
  var set = glob.minimatch.set;
  var baseParts = setToBase(set);
  var basePath = path.normalize(baseParts.join(path.sep))+path.sep;
  return basePath;
};
