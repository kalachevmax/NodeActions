

/**
 * @typedef {string|!Buffer}
 */
act.fs.FileContent;


/**
 * @type {fm.Action}
 */
act.fs.concat = fm.FILE([
  fm.FILE_PATH(fm.StringInput()),

  fm.FILE_CONTENT([
    fm.FILE_CONTENT_BODY([
      fm.LIST(fm.Type.FILE_CONTENT, fm.ListStringInput()),
      fm.fold
    ]),

    fm.FILE_CONTENT_ENCODING('utf8')
  ]),

  fm.FILE_MODE(438)
]);
