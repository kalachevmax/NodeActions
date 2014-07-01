

/**
 * @param {function(boolean)} complete
 * @param {function(string, number=)} cancel
 * @param {string} itemPath
 */
act.fs.item.directory = function(complete, cancel, itemPath) {
  fs.stat(itemPath, function(error, stats) {
    if (error !== null) {
      complete(stats && stats.isDirectory());
    } else {
      cancel('[act.fs.item.directory] ' + error.toString());
    }
  });
};


/**
 * @param {function(boolean)} complete
 * @param {function(string, number=)} cancel
 * @param {string} path
 */
act.fs.item.exists = function(complete, cancel, path) {
  fs.exists(path, function(result) {
    complete(result);
  });
};
