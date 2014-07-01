

/**
 * @param {function(!Array.<string>)} complete
 * @param {function(string, number=)} cancel
 * @param {string} root
 */
act.fs.tree.traverse = function(complete, cancel, root) {
  fm.set('nodes', []);
  fm.set('leafs', []);

  fm.define('node.path', fm.async(function(node) {
    path.join(fm.get('nodes').join('/'), node);
  }));

  fm.script([
    act.fs.node.visit,
    act.fs.node.process
  ])(function() {
    complete(fm.get('leafs'));
  }, cancel, root);
};


/**
 * @param {function()} complete
 * @param {function(string, number=)} cancel
 * @param {string} root
 */
act.fs.tree.remove = function(complete, cancel, root) {
  fm.script([
    act.fs.node.visit,
    act.fs.node.process
  ])(complete, cancel, root);
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
act.fs.tree.countNodes = function(filterFn) {
  fm.set('nodes', []);
  fm.set('leafs', []);

  fm.define('node.path', fm.async(function(node) {
    path.join(fm.get('nodes').join('/'), node);
  }));

  fm.define('node.current', function() {
    var nodes = fm.get('nodes');
    return nodes[nodes.length-1];
  });

  fm.define('count', fm.async(function(node) {
    if (filterFn(fm.get('node.current'), node)) {
      fm.inc('count');
    }
  }));


  /**
   * @param {string} dirPath
   * @param {function(!Array.<string>)} complete
   * @param {function(string, number=)} cancel
   */
  return function(dirPath, complete, cancel) {
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
