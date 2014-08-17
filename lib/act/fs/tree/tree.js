

/**
 * @type {fm.Action}
 */
act.fs.tree.read = fm.script([
  dm.arg.str('root'),
  dm.set.action(am.tree.node.has.children, act.fs.node.is.directory),
  dm.set.action(am.tree.node.get.children, act.fs.dir.read),
  am.tree.traverse
]);


/**
 * @type {fm.Action}
 */
act.fs.tree.remove = fm.script([
  dm.arg.str('root'),
  dm.set.action(am.tree.node.custom.leave, act.fs.dir.remove),
  am.tree.traverse
]);
