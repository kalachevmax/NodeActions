

/**
 * @param {function(!Array.<string>)} complete
 * @param {function(string, number=)} cancel
 * @param {string} root
 */
act.fs.tree.read = function(complete, cancel, root) {
  act.tree.node.hasChildren = act.fs.dir.isDirectory;
  act.tree.node.getChildren = act.fs.dir.read;
  act.tree.traverse(complete, cancel, root);
};
