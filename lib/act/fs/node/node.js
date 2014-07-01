

/**
 * @param {function(string)} complete
 * @param {function(string, number=)} cancel
 * @param {string} node
 */
act.fs.node.visit = function (complete, cancel, node) {
  fm.get('nodes').push(node);
  complete(node);
};


/**
 * @param {function()} complete
 * @param {function(string, number=)} cancel
 */
act.fs.node.leave = function(complete, cancel) {
  fm.get('nodes').pop();
  complete();
};


/**
 * @param {function()} complete
 * @param {function(string, number=)} cancel
 * @param {string} node
 */
act.fs.node.process = function(complete, cancel, node) {
  fm.script([
    act.fs.node.get('children'),
    fm.each(act.fs.node.process),
    act.fs.dir.leave
  ])(complete, cancel, node);
};


/**
 * @param {function()} complete
 * @param {function(string, number=)} cancel
 * @param {string} item
 */
act.fs.node.process = function(complete, cancel, item) {
  fm.script([
    fm.calc('item.path'),
    fm.if(act.fs.item.directory, fm.script([
      act.fs.node.visit,
      act.fs.node.process
    ]), act.fs.item.add)
  ])(complete, cancel, item);
};


/**
 * @param {function()} complete
 * @param {function(string, number=)} cancel
 * @param {string} leaf
 */
act.fs.node.saveLeaf = function(complete, cancel, leaf) {
  fm.get('leafs').push(leaf);
  complete();
};
