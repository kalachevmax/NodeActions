

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


/**
 * @param {function(!Array.<string>)} complete
 * @param {function(string, number=)} cancel
 * @param {string} path
 */
act.fs.dir.read = function(complete, cancel, path) {
  fs.readdir(path, function(error, items) {
    if (error === null) {
      complete(items);
    } else {
      cancel('[act.fs.dir.read] ' + error.toString());
    }
  });
};


act.fs.dir.process = fm.script([
  act.fs.dir.read,
  fm.each(processItem),
  leaveDir
]);
