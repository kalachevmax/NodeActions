

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


/**
 * @param {number} mode
 * @return {fm.Action|function(string, function(string, number=), string)}
 */
act.fs.node.chmod = function(mode) {
  /**
   * @param {function(string)} complete
   * @param {function(string, number=)} cancel
   * @param {string} path
   */
  function chmod(complete, cancel, path) {
    fs.chmod(path, mode, function() {
      complete(path);
    });
  }

  return chmod;
};
