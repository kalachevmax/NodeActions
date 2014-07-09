

/**
 * @param {function(string|!Buffer)} complete
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
