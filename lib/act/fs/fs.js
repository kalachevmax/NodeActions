

/**
 * @param {function(boolean)} complete
 * @param {function(string, number=)} cancel
 * @param {string} path
 */
act.fs.isDirectory = function(complete, cancel, path) {
  fs.stat(path, function (error, stats) {
    if (error !== null) {
      complete(stats && stats.isDirectory());
    } else {
      cancel('[act.fs.isDirectory] ' + error.toString());
    }
  });
};


/**
 * @type {fm.Action}
 */
act.fs.getSubDirs = fm.script([
  dm.arg.str('path'),
  dm.def.array('dirs'),

  act.fs.dir.read,
  fm.each(fm.if(act.fs.isDirectory, dm.arr.push('dirs'))),

  dm.ret.arr('dirs')
]);
