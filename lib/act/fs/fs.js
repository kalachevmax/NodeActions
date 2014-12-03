

/**
 * @typedef {string|!Buffer}
 */
act.fs.FileContent;


/**
 * @type {fm.Action}
 */
act.fs.concat = fm.script([
  fm.new.Entity(act.Type.FILE),
  fm.set.field('path', fm.arg.String('target')),

  fm.set.field('content', fm.script([
    fm.new.Array(act.Type.FILE_CONTENT, fm.arg.ArrayString('sources')),
    fm.fold
  ])),

  fm.save
]);
