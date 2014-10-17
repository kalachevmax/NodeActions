

/**
 * @param {function(fs.FileContent)} complete
 * @param {function(string, number=)} cancel
 * @param {string} path
 */
act.fs.file.read = function(complete, cancel, path) {
  fs.readFile(path, function(error, data) {
    if (error === null) {
      complete(data);
    } else {
      cancel('[act.fs.file.read] ' + error.toString());
    }
  });
};


/**
 * @param {function(fs.FileContent)} complete
 * @param {function(string, number=)} cancel
 * @param {string} path
 */
act.fs.file.remove = function(complete, cancel, path) {
  fs.unlink(path, function(error) {
    if (error === null) {
      complete(path);
    } else {
      cancel('[act.fs.file.remove] ' + error.toString());
    }
  });
};


/**
 * @param {string|!Buffer} data
 * @param {!Object=} opt_options
 * @return {fm.Action|function(function(string|!Buffer), function(string, number=), string)}
 */
act.fs.file.write = function(data, opt_options) {
  /**
   * @param {function(string|!Buffer)} complete
   * @param {function(string, number=)} cancel
   * @param {string} path
   */
  function write(complete, cancel, path) {
    fs.writeFile(path, data, opt_options, function(error) {
      if (error === null) {
        complete(data);
      } else {
        cancel('[act.fs.writeFile]: ' + error.toString());
      }
    });
  }

  return write;
};
