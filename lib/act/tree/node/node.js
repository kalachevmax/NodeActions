

/**
 * @param {function(string)} complete
 * @param {function(string, number=)} cancel
 * @param {string} node
 */
act.tree.node.visit = function(complete, cancel, node) {
  fm.script([
    dm.arr('nodes').push(node),
    act.tree.node.custom.visit
  ])(function() {
    complete(node);
  }, cancel, node);
};


/**
 * @param {function(string)} complete
 * @param {function(string, number=)} cancel
 * @param {string} node
 */
act.tree.node.leave = function(complete, cancel, node) {
  fm.script([
    dm.arr('nodes').pop(),
    act.tree.node.custom.leave
  ])(function() {
    complete(node);
  }, cancel, node);
};


/**
 * @param {function(string)} complete
 * @param {function(string, number=)} cancel
 * @param {string} leaf
 */
act.tree.node.save = function(complete, cancel, leaf) {
  fm.script([
    dm.arr('leafs').push(leaf),
    act.tree.leaf.save
  ])(function() {
    complete(node);
  }, cancel, node);
};


/**
 * @param {function()} complete
 * @param {function(string, number=)} cancel
 * @param {string} node
 */
act.tree.node.process = function(complete, cancel, node) {
  fm.script([
    act.tree.node.get.children,
    fm.each(act.tree.node.finalize),
    act.tree.node.leave
  ])(complete, cancel, node);
};


/**
 * @param {function()} complete
 * @param {function(string, number=)} cancel
 * @param {string} node
 */
act.tree.node.finalize = function(complete, cancel, node) {
  fm.script([
    act.tree.node.get.path,
    fm.if(act.tree.node.has.children, fm.script([
      act.tree.node.visit,
      act.tree.node.process
    ]), act.tree.node.save)
  ])(complete, cancel, node);
};


/**
 * @param {function()} complete
 * @param {function(string, number=)} cancel
 * @param {string} node
 */
act.tree.node.inc = function(complete, cancel, node) {
  fm.script([
    act.tree.node.get.current,
    dm.set.str('current.node'),
    dm.provide(dm.str('current.node'), dm.num('count'), node),
    dm.invoke.func('filter'),
    dm.inc.num('count')
  ])(complete, cancel, node);
};
