

/**
 * @typedef {string|!Buffer}
 */
act.fs.FileContent;


/**
 * @type {fm.Action}
 */
act.fs.write = fm.script([
  fm.arg.String('path'),
  fm.arg.FileContent('content'),
  fm.arg.String('encoding', 'utf8'),
  fm.arg.Number('mode', 438),

  act.fs.writeFile(fm.var('path'), fm.var('content'), fm.var('encoding'), fm.var('mode'))
]);


/**
 * @type {fm.Action}
 */
act.fs.concat = fm.script([
  fm.arg.ArrayString('sources'),
  fm.arg.String('target'),

  act.fs.write, [fm.var('target'), fm.set.FileContent(), [act.fs.concatFileContents, [fm.var('sources')]]]
]);


/**
 * @type {fm.Action}
 */
act.fs.concatFileContents = fm.script([
  fm.new.Array(act.Type.FILE_CONTENT, fm.arg.ArrayString('sources')),
  fm.fold
]);


/**
 * @param {string} path
 * @param {act.fs.FileContent} content
 * @param {string} encoding
 * @param {number} mode
 * @return {fm.Action|function(function(fm.Input), function(string, number=), fm.Input)}
 */
act.fs.writeFile = function(path, content, encoding, mode) {
  /**
   * @param {function(fm.Input)} complete
   * @param {function(string, number=)} cancel
   * @param {fm.Input} input
   */
  function write(complete, cancel, input) {
    fs.writeFile(path, content, {encoding: encoding, mode: mode}, function(error) {
      if (error === null) {
        complete(input);
      } else {
        cancel('[act.fs.file.write]: ' + error.toString());
      }
    });
  }

  return write;
};
