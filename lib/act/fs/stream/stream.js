

/**
 * @type {!Object.<fs.WriteStream>}
 */
ku.fs.stream.__streams = {};


/**
 * @param {fm.StringInput} filenameInput
 * @param {!Object=} opt_optionsInput
 * @return {fm.RegularAction}
 */
ku.fs.stream.create = function(filenameInput, opt_optionsInput) {
  /**
   * @param {fm.Complete} complete
   * @param {fm.Cancel} cancel
   * @param {fm.Input} input
	 * @param {!fm.ExecContext=} opt_context
   */
  function create(complete, cancel, input, opt_context) {
    var filename = fm.unboxString(filenameInput, opt_context);
		var options = opt_optionsInput ? fm.unboxObject(opt_optionsInput, opt_context) : undefined;

    ku.fs.stream.__streams[filename] = fs.createWriteStream(filename, options);
    complete(input);
  }

  return create;
};


/**
 * @param {fm.StringInput} filenameInput
 * @param {fm.ChunkInput=} opt_chunkInput
 * @return {fm.ChunkAction}
 */
ku.fs.stream.write = function(filenameInput, opt_chunkInput) {
  /**
   * @param {function(stream.Chunk)} complete
   * @param {function(string, number=)} cancel
   * @param {fm.Input} input
	 * @param {!fm.ExecContext=} opt_context
   */
  function action(complete, cancel, input, opt_context) {
    var filename = fm.unboxString(filenameInput, opt_context);
    var chunk = opt_chunkInput ? fm.unboxChunk(opt_chunkInput, opt_context) : input;

    if (ku.fs.stream.__streams[filename] !== null) {
			ku.fs.stream.__streams[filename].write(chunk);
      complete(chunk);
    } else {
      cancel('[ku.fs.stream.write] stream ' + filename + ' doesn\'t exists');
    }
  }

  return action;
};


/**
 * @param {fm.StringInput} filenameInput
 * @return {fm.RegularAction}
 */
ku.fs.stream.close = function(filenameInput) {
  /**
   * @param {function(fm.Input)} complete
   * @param {function(string, number=)} cancel
   * @param {fm.Input} input
	 * @param {!fm.ExecContext=} opt_context
   */
  function action(complete, cancel, input, opt_context) {
    var filename = fm.unboxString(filenameInput, opt_context);

    if (ku.fs.stream.__streams[filename] !== null) {
      ku.fs.stream.__streams[filename].end();
      complete(input);
    } else {
      cancel('[ku.fs.stream.close] stream ' + filename + ' doesn\'t exists');
    }
  }

  return action;
};


/**
 * @param {fm.StringInput} filenameInput
 * @param {fm.NumberInput} sizeInput
 * @param {fm.Action} action
 * @return {fm.RegularAction}
 */
ku.fs.stream.read = function(filenameInput, sizeInput, action) {
  /**
   * @param {function(fm.Input)} complete
   * @param {function(string, number=)} cancel
   * @param {fm.Input} input
	 * @param {!fm.ExecContext=} opt_context
   */
  function read(complete, cancel, input, opt_context) {
		var filename = fm.unboxString(filenameInput, opt_context);
		var size = fm.unboxNumber(sizeInput, opt_context);

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
      complete(input);
    }

    function handleError(error) {
      cancel('[ku.fs.stream.read] ' + error.toString());
    }
  }

  return read;
};
