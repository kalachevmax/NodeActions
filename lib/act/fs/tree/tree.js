

/**
 * @param {function(!Array.<string>)} complete
 * @param {function(string, number=)} cancel
 * @param {string} dirPath
 */
act.fs.tree.read = function(complete, cancel, dirPath) {
  fm.set('dirs.array', []);
  fm.set('items', []);

  fm.define('item.path', function(item) {
    path.join(fm.get('dirs.array').join('/'), item);
  });

  fm.script([
    act.fs.dir.enter(dirPath),
    act.fs.dir.process
  ])(dirPath, function() {
    complete(fm.get('items'));
  }, cancel);
};
