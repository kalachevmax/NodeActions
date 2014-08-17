

/**
 * @param {function(boolean)} complete
 * @param {function(string, number=)} cancel
 * @param {fm.Input} path
 */
act.fs.node.is.directory = function(complete, cancel, path) {
  if (typeof path == 'string') {
    fs.stat(path, function (error, stats) {
      if (error !== null) {
        complete(stats !== null && stats.isDirectory());
      } else {
        cancel('[act.fs.node.is.directory] ' + error.toString());
      }
    });
  } else {
    cancel('[act.fs.node.is.directory] type of path ' + path +
      ' is not ' + dm.Type.STRING);
  }
};
