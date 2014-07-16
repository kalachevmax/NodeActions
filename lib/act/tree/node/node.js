

/**
 * @type {fm.Action}
 */
act.tree.node.visit = fm.script([
  dm.arr('nodes').push,
  act.tree.node.custom.visit
]);


/**
 * @type {fm.Action}
 */
act.tree.node.leave = fm.script([
  dm.arr('nodes').pop,
  act.tree.node.custom.leave
]);


/**
 * @type {fm.Action}
 */
act.tree.node.process = fm.script([
  act.tree.node.get.children,
  fm.each(act.tree.node.finalize),
  act.tree.node.leave
]);


/**
 * @type {fm.Action}
 */
act.tree.node.finalize = fm.script([
  act.tree.node.get.path,
  fm.if(act.tree.node.has.children, fm.script([
    act.tree.node.visit,
    act.tree.node.process
  ]), act.tree.leaf.save)
]);


/**
 * @type {fm.Action}
 */
act.tree.node.inc = fm.script([
  act.tree.node.get.current,
  dm.set.str('current.node'),
  dm.provide(dm.str('current.node'), dm.num('count'), node),
  dm.invoke.func('filter'),
  dm.inc.num('count')
]);
