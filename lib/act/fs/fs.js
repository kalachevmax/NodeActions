

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
      fm.LIST(fm.BODY, fm.ARG_LIST_STRING),
      fm.fold
    ]),

    fm.ENCODING('utf8')
  ]),

  fm.PATH(fm.ARG_STRING),
  fm.MODE(438)
]);
