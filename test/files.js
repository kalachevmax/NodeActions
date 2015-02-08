

var main = act.fs.concat(
  FileNamesList([act.cli.put('Enter sources: '), act.cli.read]),
  TargetFileName([act.cli.put('Enter target: '), act.cli.read])
);


main(handleSuccess, console.error);

function handleSuccess() {
  console.log('Operation successfully completed.');
}
