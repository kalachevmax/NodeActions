

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
 * @param {function(!Array.<string>)} complete
 * @param {function(string, number=)} cancel
 * @param {string} dirPath
 */
act.fs.dir.readTree = function(complete, cancel, dirPath) {
  var fullPath = [];
  var files = [];

  function enterDir(dirPath) {
    return function (complete, cancel, fullDirPath) {
      fullPath.push(dirPath);
      complete(fullDirPath);
    }
  }

  function leaveDir(complete, cancel) {
    fullPath.pop();
    complete();
  }

  function addFile(complete, cancel, file) {
    files.push(file);
    complete();
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
      fm.if(act.fs.is.directory, fm.script([
        enterDir(item),
        processDir
      ]), addFile)
    ])(complete, cancel, fullItemPath);
  }

  fm.script([
    enterDir(dirPath),
    processDir
  ])(function() {
    complete(files);
  }, cancel, dirPath);
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


/**
 * @param {function(number)} complete
 * @param {function(string, number=)} cancel
 * @param {string} dirPath
 */
act.fs.dir.countSubdirs = function(complete, cancel, dirPath) {
  var count = 0;
  var fullPath = [];
  var currentDir = dirPath;

  function enterDir(dirPath) {
    return function (complete, cancel, fullDirPath) {
      fullPath.push(dirPath);
      currentDir = dirPath;
      complete(fullDirPath);
    }
  }

  function leaveDir(complete, cancel) {
    fullPath.pop();
    complete();
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

    if (currentDir === 'node_modules' && item !== '.bin') {
      count += 1;
    }

    fm.script([
      fm.if(act.fs.is.directory, fm.script([
        enterDir(item),
        processDir
      ]), fm.noact)
    ])(complete, cancel, fullItemPath);
  }

  fm.script([
    enterDir(dirPath),
    processDir
  ])(function() {
    complete(count);
  }, cancel, dirPath);
};
