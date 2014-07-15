

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
  /**
   * @param {function(number)} complete
   * @param {function(string, number=)} cancel
   * @param {fm.Input} input
   */
  function body(complete, cancel, input) {
    fm.script([
      dm.def.atom('count'),
      dm.def.func('filter', filterFn),
      dm.def.action('node.visit', act.tree.node.inc),
      act.fs.tree.traverse,
      dm.get.atom('count')
    ])(function(count) {
      complete(count);
    }, cancel, input);
  }

  return body;
};
