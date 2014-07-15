

/**
 * @param {function(!Array.<string>)} complete
 * @param {function(string, number=)} cancel
 * @param {string} root
 */
act.tree.traverse = function(complete, cancel, root) {
  fm.script([
    dm.def.atom('nodes', []),
    dm.def.atom('leafs', []),

    act.fs.node.visit,
    act.fs.node.process,

    dm.get.atom('leafs')
  ])(function(leafs) {
    complete(leafs);
  }, cancel, root);
};


/**
 * @param {function()} complete
 * @param {function(string, number=)} cancel
 * @param {string} root
 */
act.tree.remove = function(complete, cancel, root) {
  dm.proc('node.leave', function(complete, cancel, node) {
    act.fs.dir.remove(complete, cancel, node);
  });

  act.fs.tree.traverse(complete, cancel, root);
};
