

/**
 * @param {function()} complete
 * @param {function(string, number=)} cancel
 * @param {string} path
 */
act.fs.dir.create = function(complete, cancel, path) {
  fs.mkdir(path, function(error) {
    if (error === null) {
      complete();
    } else {
      cancel('[act.fs.dir.create] ' + error.toString());
    }
  })
};
