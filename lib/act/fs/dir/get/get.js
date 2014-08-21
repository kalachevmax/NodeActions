

/**
 * @type {fm.Action}
 */
act.fs.dir.get.nested = fm.script([
  dm.arg.str('path'),
  dm.def.array('dirs'),

  act.fs.dir.read,

  fm.each(fm.script([
    dm.set.str('node'),

    fm.if(act.fs.node.is.directory, fm.script([
      dm.array('dirs'),
      dm.act.array.push('node')
    ]))
  ])),

  dm.ret.array('dirs')
]);
