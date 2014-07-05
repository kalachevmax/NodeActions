

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
