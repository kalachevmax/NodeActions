

/**
 * @param {function(!Array.<string>)} complete
 * @param {function(string, number=)} cancel
 * @param {string} dirPath
 */
act.fs.tree.read = function(complete, cancel, dirPath) {
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
