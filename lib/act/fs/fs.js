

/**
 * @typedef {string|!Buffer}
 */
act.fs.FileContent;


/**
 * @type {fm.Action}
 */
act.fs.concat = fm.script([
  fm.FILE(fm.script([
    fm.PATH(fm.Stringinput()),

    fm.CONTENT(fm.script([
      fm.BODY(fm.script([
        fm.List(fm.Type.FILE_CONTENT, fm.ListStringInput()),
        fm.fold
      ])),

      fm.ENCODING('utf8')
    ])),

    fm.MODE(438)
  ])),

  fm.save
]);
