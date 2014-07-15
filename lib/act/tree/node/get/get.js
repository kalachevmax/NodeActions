

act.tree.node.get.current = function(complete, cancel, input) {
  dm.get.atom('nodes')(function(nodes) {
    complete(nodes[nodes.length - 1]);
  }, cancel, input);
};


/**
 * @param {function(!Array.<string>)} complete
 * @param {function(string, number=)} cancel
 * @param {string} node
 */
act.tree.node.get.children = function(complete, cancel, node) {
  complete([]);
};


/**
 * @param {function(boolean)} complete
 * @param {function(string, number=)} cancel
 * @param {string} node
 */
act.tree.node.has.children = function(complete, cancel, node) {
  complete(false);
};


/**
 * @param {function(string)} complete
 * @param {function(string, number=)} cancel
 * @param {string} node
 */
act.tree.node.get.path = function(complete, cancel, node) {
  dm.get.atom('nodes')(function(nodes) {
    complete(path.join(nodes.join('/'), node));
  }, cancel, node);
};
