

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
  });
};


/**
 * @param {function()} complete
 * @param {function(string, number=)} cancel
 * @param {string} path
 */
act.fs.dir.remove = function(complete, cancel, path) {
  fs.rmdir(path, function(error) {
    if (error === null) {
      complete();
    } else {
      cancel('[act.fs.dir.remove] ' + error.toString());
    }
  });
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
 * @param {string} dirPath
 */
act.fs.dir.removeTree = function(complete, cancel, dirPath) {
  var fullPath = [];

  function enterDir(dirPath) {
    return function (complete, cancel, fullDirPath) {
      fullPath.push(dirPath);
      complete(fullDirPath);
    }
  }

  function leaveDir(complete, cancel) {
    var fullItemPath = path.join(fullPath.join('/'));
    act.fs.dir.remove(function() {
      fullPath.pop();
      complete();
    }, cancel, fullItemPath);
  }

  function processDir(complete, cancel, dirPath) {
    fm.script([
      act.fs.dir.read,
      fm.each(processItem),
      leaveDir
    ])(complete, cancel, dirPath);
  }

  function processItem(complete, cancel, item) {
    var fullItemPath = path.join(fullPath.join('/'), item);

    fm.script([
      fm.if(act.fs.node.is.directory, fm.script([
        enterDir(item),
        processDir
      ]), act.fs.file.safeRemove)
    ])(complete, cancel, fullItemPath);
  }

  fm.script([
    enterDir(dirPath),
    processDir
  ])(function() {
    complete();
  }, cancel, dirPath);
};
