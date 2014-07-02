

/**
 * @param {string} type
 * @return {fm.Action}
 */
act.fs.node.is = function(type) {
  /**
   * @param {function(boolean)} complete
   * @param {function(string, number=)} cancel
   * @param {string} path
   */
  function is(complete, cancel, path) {
    fs.stat(path, function (error, stats) {
      if (error !== null) {
        complete(stats && (type === 'directory' && stats.isDirectory()) ||
            (type === 'file' && stats.isFile()));
      } else {
        cancel('[act.fs.node.is] ' + error.toString());
      }
    });
  }

  return is;
};


/**
 * @param {function(boolean)} complete
 * @param {function(string, number=)} cancel
 * @param {string} path
 */
act.fs.node.exists = function(complete, cancel, path) {
  fs.exists(path, function(result) {
    complete(result);
  });
};
