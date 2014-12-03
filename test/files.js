

var script = fm.script([
  fm.LIST_STRING(fm.script([
    fm.STRING('Enter sources: '),
    act.cli.put,
    act.cli.get
  ])),

  fm.STRING('target', fm.script([
    fm.STRING('Enter target: '),
    act.cli.put,
    act.cli.get
  ])),

  act.fs.concat
]);


script(handleSuccess, console.error);

function handleSuccess() {
  console.log('Operation successfully completed.');
}
