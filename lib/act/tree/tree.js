

/**
 * @type {fm.Action}
 */
act.tree.traverse = fm.script([
  dm.arg.str('root'),

  dm.def.arr('nodes', []),
  dm.def.arr('leafs', []),

  act.fs.node.visit,
  act.fs.node.process,

  dm.ret.arr('leafs')
]);
