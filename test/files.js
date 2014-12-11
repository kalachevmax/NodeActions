

var chain = [
  FileNamesList([act.cli.put('Enter sources: '), act.cli.read]),
  TargetFileName([act.cli.put('Enter target: '), act.cli.read]),
  act.fs.concat
];


fm.invoke(chain, handleSuccess, console.error);

function handleSuccess() {
  console.log('Operation successfully completed.');
}
