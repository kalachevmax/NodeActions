

/**
 * @typedef {string|!Buffer}
 */
act.fs.FileContent;


/**
 * @type {fm.Action}
 */
act.fs.concat = fm.FILE([
  fm.CONTENT([
    fm.BODY([
      fm.LIST(fm.Type.FILE_CONTENT, fm.ListStringInput()),
      fm.fold
    ]),

    fm.ENCODING('utf8')
  ]),

  fm.PATH(fm.StringInput()),
  fm.MODE(438)
]);
