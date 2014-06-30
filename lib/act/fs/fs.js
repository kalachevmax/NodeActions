

/**
 * @param {string} itemPath
 * @param {function(boolean)} complete
 * @param {function(string, number=)} cancel
 */
act.fs.isDirectory = function(itemPath, complete, cancel) {
  fs.stat(itemPath, function(err, stats) {
    if (err) {
      cancel('[act.fs.isDirectory]: ' + err.toString());
    } else {
      complete(stats && stats.isDirectory());
    }
  });
};


/**
 * @param {string} dirPath
 * @param {function(!Array.<string>)} complete
 * @param {function(string, number=)} cancel
 */
act.fs.readFilesTree = function(dirPath, complete, cancel) {
  var fullPath = [];
  var files = [];

  function enterDir(dirPath) {
    return function (fullDirPath, complete, cancel) {
      fullPath.push(dirPath);
      complete(fullDirPath);
    }
  }

  function leaveDir(_, complete, cancel) {
    fullPath.pop();
    complete();
  }

  function addFile(file, complete, cancel) {
    files.push(file);
    complete();
  }

  function processDir(dirPath, complete, cancel) {
    fm.script([
      act.fs.readDir,
      fm.each(processItem),
      leaveDir
    ])(dirPath, complete, cancel);
  }

  function processItem(item, complete, cancel) {
    var fullItemPath = path.join(fullPath.join('/'), item);

    fm.script([
      fm.if(act.fs.isDirectory, fm.script([
        enterDir(item),
        processDir
      ]), addFile)
    ])(fullItemPath, complete, cancel);
  }

  fm.script([
    enterDir(dirPath),
    processDir
  ])(dirPath, function() {
    complete(files);
  }, cancel);
};


/**
 *
 * filterFn function example:
 *
 * function isPackage(currentDir, currentItem) {
 *   return currentDir === 'node_modules' && currentItem.indexOf('.bin') === -1;
 * }
 *
 *
 * @param {function(string, string):boolean} filterFn
 * @return {fm.Action}
 */
act.fs.countSubDirs = function(filterFn) {
  /**
   * @param {string} dirPath
   * @param {function(!Array.<string>)} complete
   * @param {function(string, number=)} cancel
   */
  return function(dirPath, complete, cancel) {
    var fullPath = [];
    var files = [];
    var currentDir = '';
    var count = 0;

    function updateCount(currentItem, complete, cancel) {
      if (filterFn(currentDir, currentItem)) {
        count += 1;
      }
      complete(currentItem);
    }

    function enterDir(dirPath) {
      return function (fullDirPath, complete, cancel) {
        currentDir = dirPath;
        fullPath.push(dirPath);
        complete(fullDirPath);
      }
    }

    function leaveDir(_, complete, cancel) {
      fullPath.pop();
      complete();
    }

    function addFile(file, complete, cancel) {
      files.push(file);
      complete();
    }

    function processDir(dirPath, complete, cancel) {
      fm.script([
        act.fs.readDir,
        fm.each(processItem),
        leaveDir
      ])(dirPath, complete, cancel);
    }

    function processItem(item, complete, cancel) {
      var fullItemPath = path.join(fullPath.join('/'), item);

      fm.script([
        fm.if(act.fs.isDirectory, fm.script([
          updateCount,
          enterDir(item),
          processDir
        ]), addFile)
      ])(fullItemPath, complete, cancel);
    }

    fm.script([
      enterDir(dirPath),
      processDir
    ])(dirPath, function() {
      complete(count);
    }, cancel);
  };
};
