

/**
 * @typedef {string|!Buffer}
 */
act.fs.FileContent;


/**
 * @type {fm.Action}
 */
act.fs.concat = fm.script([
  fm.Entity(act.Type.FILE),
  fm.field('path', fm.arg.String('target')),

  fm.field('content', fm.script([
    fm.Array(act.Type.FILE_CONTENT, fm.arg.ArrayString('sources')),
    fm.fold
  ])),

  fm.save
]);
