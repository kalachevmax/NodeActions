

/**
 * @param {function(!Array.<string>)} complete
 * @param {function(string, number=)} cancel
 * @param {string} root
 */
act.tree.traverse = function(complete, cancel, root) {
  fm.set('nodes', []);
  fm.set('leafs', []);

  fm.define('current.node', function() {
    var nodes = fm.get('nodes');
    return nodes[nodes.length-1];
  });

  fm.script([
    act.fs.node.visit,
    act.fs.node.process
  ])(function() {
    complete(fm.get('leafs'));
  }, cancel, root);
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
act.tree.countNodes = function(filterFn) {
  fm.proc('node.visit', fm.async(function(node) {
    if (filterFn(fm.get('current.node'), node)) {
      fm.inc('count');
    }
  }));

  return act.fs.tree.traverse;
};


/**
 * @param {function()} complete
 * @param {function(string, number=)} cancel
 * @param {string} root
 */
act.tree.remove = function(complete, cancel, root) {
  fm.proc('node.leave', function(complete, cancel, node) {
    act.fs.dir.remove(complete, cancel, node);
  });

  act.fs.tree.traverse(complete, cancel, root);
};
