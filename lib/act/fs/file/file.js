

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
 * @param {function(fs.FileContent)} complete
 * @param {function(string, number=)} cancel
 * @param {string} path
 */
act.fs.file.safeRemove = function(complete, cancel, path) {
  act.fs.file.remove(complete, function() {
    fm.script([
      act.fs.node.chmod(511),
      act.fs.file.remove
    ])(function() {
      complete(path);
    }, cancel, path);
  }, path);
};


/**
 * @param {fs.FileContent} data
 * @param {!Object=} opt_options
 * @return {fm.Action|function(function(fs.FileContent), function(string, number=), string)}
 */
act.fs.file.write = function(data, opt_options) {
  /**
   * @param {function(fs.FileContent)} complete
   * @param {function(string, number=)} cancel
   * @param {string} path
   */
  function write(complete, cancel, path) {
    fs.writeFile(path, data, opt_options, function(error) {
      if (error === null) {
        complete(data);
      } else {
        cancel('[act.fs.file.write]: ' + error.toString());
      }
    });
  }

  return write;
};


/**
 * @param {string} filename
 * @return {fm.Action|function(function(fs.FileContent), function(string, number=), fs.FileContent)}
 */
act.fs.file.appendTo = function(filename) {
  /**
   * @param {function(fs.FileContent)} complete
   * @param {function(string, number=)} cancel
   * @param {fs.FileContent} content
   */
  function appendTo(complete, cancel, content) {
    fs.appendFile(filename, content, function (error, data) {
      if (error === null) {
        complete(data);
      } else {
        cancel('[act.fs.file.appendTo] ' + filename + ': ' + error.toString());
      }
    });
  }

  return appendTo;
};
