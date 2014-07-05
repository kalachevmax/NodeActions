

/**
 * @param {function(!Array.<string>)} complete
 * @param {function(string, number=)} cancel
 * @param {string} node
 */
act.tree.node.getChildren = function(complete, cancel, node) {
  complete([]);
};


/**
 * @param {function(boolean)} complete
 * @param {function(string, number=)} cancel
 * @param {string} node
 */
act.tree.node.hasChildren = function(complete, cancel, node) {
  complete(false);
};


/**
 * @param {function(string)} complete
 * @param {function(string, number=)} cancel
 * @param {string} node
 */
act.tree.node.getPath = function(complete, cancel, node) {
  complete(path.join(dm.get('nodes').join('/'), node));
};


/**
 * @param {function(string)} complete
 * @param {function(string, number=)} cancel
 * @param {string} node
 */
act.tree.node.visit = function (complete, cancel, node) {
  dm.get('nodes').push(node);

  if (dm.defined('node.visit')) {
    dm.act('node.visit')(function() {
      complete(node);
    }, cancel, node);
  } else {
    complete(node);
  }
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
    act.tree.node.getChildren,
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
    act.tree.node.getPath,
    fm.if(act.tree.node.hasChildren, fm.script([
      act.tree.node.visit,
      act.tree.node.process
    ]), act.tree.node.save)
  ])(complete, cancel, node);
};
