

/**
 * @typedef {string|!Buffer}
 */
act.fs.FileContent;


/**
 * @type {fm.Action}
 */
act.fs.concat = fm.script([
  fm.Entity(act.Type.FILE),
  fm.field('path', fm.field('target')),

  fm.field('content', fm.script([
    fm.List(act.Type.FILE_CONTENT, fm.field('sources')),
    fm.fold
  ])),

  fm.save
]);
