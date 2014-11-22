

fm.script([
  dm.OutputFile
    .setEncoding('utf8')
    .setMode(438)
    .retrieveContent(act.fs.concat(fm.new.array(['file1.txt', 'file2.txt', 'file3.txt']))),

  act.fs.file.write
]);
