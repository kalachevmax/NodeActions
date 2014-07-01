

/**
 * @param {string} key
 * @return {fm.Action}
 */
act.fs.node.get = function(key) {
  function get(complete, cancel, node) {
    if (key === 'path') {
      complete(path.join(fm.get('nodes').join('/'), node));
    } else if (key === 'children') {
      act.fs.dir.read(complete, cancel, node);
    } else {
      cancel('[act.fs.node.get] unknown key: ' + key);
    }
  }

  return get;
};


/**
 * @param {function(string)} complete
 * @param {function(string, number=)} cancel
 * @param {string} node
 */
act.fs.node.visit = function (complete, cancel, node) {
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
act.fs.node.leave = function(complete, cancel, node) {
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
act.fs.node.save = function(complete, cancel, leaf) {
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
act.fs.node.process = function(complete, cancel, node) {
  fm.script([
    act.fs.node.get('children'),
    fm.each(act.fs.node.finalize),
    act.fs.node.leave
  ])(complete, cancel, node);
};


/**
 * @param {function()} complete
 * @param {function(string, number=)} cancel
 * @param {string} node
 */
act.fs.node.finalize = function(complete, cancel, node) {
  fm.script([
    act.fs.node.get('path'),
    fm.if(act.fs.node.is('directory'), fm.script([
      act.fs.node.visit,
      act.fs.node.process
    ]), act.fs.node.save)
  ])(complete, cancel, node);
};


/**
 * @param {string} type
 * @return {fm.Action}
 */
act.fs.node.is = function(type) {
  /**
   * @param {function(boolean)} complete
   * @param {function(string, number=)} cancel
   * @param {string} path
   */
  function is(complete, cancel, path) {
    fs.stat(path, function (error, stats) {
      if (error !== null) {
        complete(stats && (type === 'directory' && stats.isDirectory()) ||
            (type === 'file' && stats.isFile()));
      } else {
        cancel('[act.fs.node.is] ' + error.toString());
      }
    });
  }

  return is;
};


/**
 * @param {function(boolean)} complete
 * @param {function(string, number=)} cancel
 * @param {string} path
 */
act.fs.node.exists = function(complete, cancel, path) {
  fs.exists(path, function(result) {
    complete(result);
  });
};
