

/**
 * @type {fm.Action}
 */
act.fs.dir.get.nested = fm.script([
  dm.arg.str('path'),
  dm.def.array('dirs'),

  act.fs.dir.read,
  fm.each(fm.if(act.fs.node.is.directory, dm.arr.push('dirs'))),

  dm.ret.arr('dirs')
]);
