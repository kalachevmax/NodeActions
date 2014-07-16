

/**
 * @type {fm.Action}
 */
act.fs.tree.read = fm.script([
  dm.arg.str('root'),

  dm.def.action(act.tree.node.has.children, act.fs.dir.isDirectory),
  dm.def.action(act.tree.node.get.children, act.fs.dir.read),

  act.tree.traverse
]);


/**
 * @type {fm.Action}
 */
act.fs.tree.remove = fm.script([
  dm.arg.str('root'),

  dm.def.action(act.tree.node.custom.leave, act.fs.dir.remove),

  act.fs.tree.traverse
]);



dm.proc('node.leave', function(complete, cancel, node) {
  act.fs.dir.remove(complete, cancel, node);
});