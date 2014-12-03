

var script = fm.script([
  fm.List(act.Type.FILE),

  fm.field('sources', fm.script([
    fm.String('Enter sources: '),
    act.cli.put,

    act.cli.get,
    fm.ListString()
  ])),

  fm.field('target', fm.script([
    fm.String('Enter target: '),
    act.cli.put,

    act.cli.get,
    fm.String()
  ])),

  fm.concat
]);


script(handleSuccess, console.error);

function handleSuccess() {
  console.log('Operation successfully completed.');
}
