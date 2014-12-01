

/**
 * @type {fm.Action}
 */
act.fs.files.concat = fm.script(
  {sources: fm.Type.ARRAY.STRING, target: fm.Type.STRING}, [

  dm.OutputFile
    .setEncoding('utf8')
    .setMode(438)
    .retrieveContent(act.fs.concat(dm.array('sources'))),

  act.fs.file.write
]);
