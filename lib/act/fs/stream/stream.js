

/**
 * @type {stream.Writable}
 */
act.fs.stream.__stream = null;


/**
 * @param {string} filename
 * @param {!Object=} opt_options
 * @return {fm.Action}
 */
act.fs.stream.create = function(filename, opt_options) {
  /**
   * @param {function()} complete
   * @param {function(string, number=)} cancel
   * @param {fm.Input=} opt_input
   */
  function create(complete, cancel, opt_input) {
    act.fs.stream.__stream = fs.createWriteStream(filename, opt_options);
    complete();
  }

  return create;
};


/**
 * @param {number} size
 * @param {fm.Action} action
 * @return {fm.Action}
 */
act.fs.stream.read = function(size, action) {
  /**
   * @param {function()} complete
   * @param {function(string, number=)} cancel
   * @param {string} filename
   */
  function read(complete, cancel, filename) {
    var stream = fs.createReadStream(filename);

    stream.on('readable', handleReadable);
    stream.on('end', handleEnd);
    stream.on('error', handleError);

    function handleReadable() {
      var chunk;

      while ((chunk = stream.read(size)) !== null) {
        action(fm.nop, console.log, chunk);
      }
    }

    function handleEnd() {
      complete();
    }

    function handleError(error) {
      cancel('[act.fs.stream.read] ' + error.toString);
    }
  }

  return read;
};


/**
 * @param {function(string|!Buffer)} complete
 * @param {function(string, number=)} cancel
 * @param {string|!Buffer} chunk
 */
act.fs.stream.write = function(complete, cancel, chunk) {
  if (act.fs.stream.__stream !== null) {
    act.fs.stream.__stream.write(chunk);
    complete(chunk);
  } else {
    cancel('[act.fs.stream.write] stream is null');
  }
};


/**
 * @param {function(fm.Input=)} complete
 * @param {function(string, number=)} cancel
 * @param {fm.Input=} opt_input
 */
act.fs.stream.close = function(complete, cancel, opt_input) {
  if (act.fs.stream.__stream !== null) {
    act.fs.stream.__stream.end();
    complete(opt_input);
  } else {
    cancel('[act.fs.stream.close] stream is null');
  }
};
