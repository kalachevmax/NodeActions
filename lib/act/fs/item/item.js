

/**
 * @param {function(boolean)} complete
 * @param {function(string, number=)} cancel
 * @param {string} itemPath
 */
act.fs.item.directory = function(complete, cancel, itemPath) {
  fs.stat(itemPath, function(error, stats) {
    if (error !== null) {
      complete(stats && stats.isDirectory());
    } else {
      cancel('[act.fs.item.directory] ' + error.toString());
    }
  });
};


/**
 * @param {function()} complete
 * @param {function(string, number=)} cancel
 * @param {string} item
 */
act.fs.item.add = function(complete, cancel, item) {
  fm.get('items').push(item);
  complete();
};


/**
 * @param {function()} complete
 * @param {function(string, number=)} cancel
 * @param {string} item
 */
act.fs.item.process = function(complete, cancel, item) {
  fm.script([
    fm.if(act.fs.item.directory, fm.script([
      act.fs.dir.enter(item),
      act.fs.dir.process
    ]), act.fs.item.add)
  ])(complete, cancel, fm.calc('item.path')(item));
};
