

/**
 * @typedef {string|!Buffer}
 */
act.fs.FileContent;


/**
 * @type {fm.Action}
 */
act.fs.concat = [FileNamesList('sources'), TargetFileName('target'),
  File([
    FileContent([
      FileContentBody([
        List(FileContentBody, List(fm.Type.STRING, fm.arg('sources'))),
        fm.fold
      ]),

      FileContentEncoding('utf8')
    ]),

    FilePath(fm.Type.STRING(fm.arg('target'))),
    FileMode(438)
  ]),

  fm.save
];
