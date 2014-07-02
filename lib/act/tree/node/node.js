

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
  complete(path.join(fm.get('nodes').join('/'), node));
};


/**
 * @param {function(string)} complete
 * @param {function(string, number=)} cancel
 * @param {string} node
 */
act.tree.node.visit = function (complete, cancel, node) {
  fm.get('nodes').push(node);
  fm.invoke('node.visit')(function() {
    complete(node);
  }, cancel, node);
};


/**
 * @param {function(string)} complete
 * @param {function(string, number=)} cancel
 * @param {string} node
 */
act.tree.node.leave = function(complete, cancel, node) {
  fm.get('nodes').pop();
  fm.invoke('node.leave')(function() {
    complete(node);
  }, cancel, node);
};


/**
 * @param {function()} complete
 * @param {function(string, number=)} cancel
 * @param {string} leaf
 */
act.tree.node.save = function(complete, cancel, leaf) {
  fm.get('leafs').push(leaf);
  fm.invoke('leaf.save')(function() {
    complete(leaf);
  }, cancel, leaf);
  complete();
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
