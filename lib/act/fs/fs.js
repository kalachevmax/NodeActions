

/**
 * @param {function(boolean)} complete
 * @param {function(string, number=)} cancel
 * @param {string} path
 */
act.fs.isDirectory = function(complete, cancel, path) {
  fs.stat(path, function (error, stats) {
    if (error !== null) {
      complete(stats && stats.isDirectory());
    } else {
      cancel('[act.fs.isDirectory] ' + error.toString());
    }
  });
};


/**
 * @param {function(!Array.<string>)} complete
 * @param {function(string, number=)} cancel
 * @param {string} path
 */
act.fs.getSubDirs = function(complete, cancel, path) {
  var result = [];

  var add = fm.async(function(dir) {
    result.push(dir);
  });

  fm.script([
    act.fs.dir.read,
    fm.each(fm.if(act.fs.isDirectory, add))
  ])(function() {
    complete(result);
  }, cancel, path);
};
