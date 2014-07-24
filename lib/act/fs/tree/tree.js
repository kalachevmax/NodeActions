

/**
 * @type {fm.Action}
 */
act.fs.tree.read = fm.script([
  dm.arg.str('root'),
  dm.set.action(act.tree.node.has.children, act.fs.node.is.directory),
  dm.set.action(act.tree.node.get.children, act.fs.dir.read),
  act.tree.traverse
]);


/**
 * @type {fm.Action}
 */
act.fs.tree.remove = fm.script([
  dm.arg.str('root'),
  dm.set.action(act.tree.node.custom.leave, act.fs.dir.remove),
  act.fs.tree.traverse
]);
