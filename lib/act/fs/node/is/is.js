

/**
 * @param {function(boolean)} complete
 * @param {function(string, number=)} cancel
 * @param {string} path
 */
act.fs.node.is.directory = function(complete, cancel, path) {
  fs.stat(path, function (error, stats) {
    if (error !== null) {
      complete(stats && stats.isDirectory());
    } else {
      cancel('[act.fs.node.is.directory] ' + error.toString());
    }
  });
};
