

/**
 * @type {fm.Action}
 */
act.tree.leaf.save = fm.script([
  dm.arg.str('leaf'),
  dm.arr('leafs').push,
  act.tree.leaf.custom.save
]);
