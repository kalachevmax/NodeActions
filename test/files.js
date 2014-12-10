

var script = fm.script([
  act.fs.concat, {
    sources: TStrList([
      act.cli.put(TStr('Enter sources: ')),
      act.cli.get
    ]),

    target: TStr([
      act.cli.put(TStr('Enter target: ')),
      act.cli.get
    ])
  }
]);


script(handleSuccess, console.error);

function handleSuccess() {
  console.log('Operation successfully completed.');
}
