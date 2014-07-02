

/**
 * @param {string} key
 * @return {fm.Action}
 */
act.tree.node.get = function(key) {
  function get(complete, cancel, node) {
    if (key === 'path') {
      complete(path.join(fm.get('nodes').join('/'), node));
    } else if (key === 'children') {
      act.tree.dir.read(complete, cancel, node);
    } else {
      cancel('[act.tree.node.get] unknown key: ' + key);
    }
  }

  return get;
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
    act.tree.node.get('children'),
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
    act.tree.node.get('path'),
    fm.if(act.tree.node.is('directory'), fm.script([
      act.tree.node.visit,
      act.tree.node.process
    ]), act.tree.node.save)
  ])(complete, cancel, node);
};
