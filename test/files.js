

var script = fm.script([
  fm.Array(act.Type.FILE),
  fm.field('target', 'output.txt'),

  fm.field('sources', fm.script([
    act.cli.read,
    fm.ArrayString()
  ])),

  fm.do('concat')
]);


script(handleSuccess, console.error);

function handleSuccess() {
  console.log('Operation successfully completed.');
}
