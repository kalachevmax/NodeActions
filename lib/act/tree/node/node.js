

/**
 * @param {function(string)} complete
 * @param {function(string, number=)} cancel
 * @param {string} node
 */
act.tree.node.visit = function(complete, cancel, node) {
  fm.script([
    dm.add('nodes', node),
    fm.if(dm.defined('node.visit'), dm.action('node.visit'))
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
  dm.get('nodes').pop();

  if (dm.defined('node.leave')) {
    dm.act('node.leave')(function() {
      complete(node);
    }, cancel, node);
  } else {
    complete(node);
  }
};


/**
 * @param {function(string)} complete
 * @param {function(string, number=)} cancel
 * @param {string} leaf
 */
act.tree.node.save = function(complete, cancel, leaf) {
  dm.get('leafs').push(leaf);

  if (dm.defined('leaf.save')) {
    dm.act('leaf.save')(function() {
      complete(leaf);
    }, cancel, leaf);
  } else {
    complete(leaf);
  }
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
    dm.set.atom('current.node'),

    dm.provide(dm.atom('current.node'), dm.atom('count'), node),
    dm.invoke.func('filter'),
    dm.inc.atom('count')
  ])(complete, cancel, node);
};
