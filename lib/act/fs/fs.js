

/**
 * @typedef {string|!Buffer}
 */
act.fs.FileContent;


/**
 * @type {fm.Action}
 */
act.fs.concat = fm.script([
  TFile([
    TFileContent([
      TFileContentBody([
        TList(TFileContentBody, fm.arg('sources', TStrList)),
        fm.fold
      ]),

      TFileContentEncoding('utf8')
    ]),

    TFilePath(fm.arg('target', TStr)),
    TFileMode(438)
  ]),

  fm.save
]);
