

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
act.tree.nodes.count = function(filterFn) {
  return fm.script([
    dm.def.num('count'),
    dm.def.func('node.filter', filterFn),
    dm.set.action(act.tree.node.custom.visit, act.tree.node.inc),
    act.fs.tree.traverse,
    dm.ret.num('count')
  ]);
};
