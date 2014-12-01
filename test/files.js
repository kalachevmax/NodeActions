

var script = fm.script([
  act.fs.concat, ['file1.txt', 'file2.txt', 'file3.txt'], 'output.txt'
]);


script(handleSuccess, console.error);

function handleSuccess() {
  console.log('Operation successfully completed.');
}
