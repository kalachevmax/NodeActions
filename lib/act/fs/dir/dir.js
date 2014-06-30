

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


/**
 * @param {function()} complete
 * @param {function(string, number=)} cancel
 * @param {string} path
 */
act.fs.dir.process = function(complete, cancel, path) {
  fm.script([
    act.fs.dir.read,
    fm.each(act.fs.item.process),
    act.fs.dir.leave
  ])(complete, cancel, path);
};


/**
 * @param {string} dirPath
 * @return {fm.Action}
 */
act.fs.dir.enter = function(dirPath) {
  return function (complete, cancel, fullDirPath) {
    fm.get('dirs.array').push(dirPath);
    complete(fullDirPath);
  }
};


/**
 * @param {function()} complete
 * @param {function(string, number=)} cancel
 */
act.fs.dir.leave = function(complete, cancel) {
  fm.get('dirs.array').pop();
  complete();
};
