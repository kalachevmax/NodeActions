

/**
 * @type {fm.Action}
 */
act.tree.node.get.current = fm.script([
  dm.arr('nodes').last
]);


/**
 * @type {fm.Action}
 */
act.tree.node.get.children = fm.noact;


/**
 * @type {fm.Action}
 */
act.tree.node.get.path = fm.script([
  dm.arg.str('node'),
  dm.arr('nodes').join('/')
]);
