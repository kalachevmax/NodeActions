

fm.script([
  fm.act(act.fs.files.concat, {sources: ['file1.txt', 'file2.txt', 'file3.txt'], target: 'output.txt'})
])(function() {
  console.log('Operation successfully completed.');
}, console.error);
