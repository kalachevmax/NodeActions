

var inputFile = './input.txt';
var outputFile = './output.txt';


/**
 * @param {function(string)} complete
 * @param {function(string, number=)} cancel
 * @param {string} chunk
 */
function transorm(complete, cancel, chunk) {
  complete(chunk.toLocaleUpperCase());
}


fm.script([
  act.fs.stream.create(outputFile),
  act.fs.stream.read(inputFile, 64, fm.script([
    transorm,
    act.fs.stream.write
  ])),
  act.fs.stream.close
])(function() {
  console.log('File successfully copied.');
}, console.log);
