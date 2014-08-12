

/**
 * @type {fm.Action}
 */
act.fs.dir.read.nested = fm.script([
  dm.arg.str('path'),
  dm.def.array('dirs'),

  act.fs.dir.read,

  fm.each(fm.script([
    dm.set.str('node'),

    fm.if(act.fs.node.is.directory, fm.script([
      dm.arr('dirs'),
      dm.act.arr.push('node')
    ]))
  ])),

  dm.ret.arr('dirs')
]);
