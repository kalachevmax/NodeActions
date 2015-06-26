

/**
 * @typedef {ku.fs.file.OpenFlag|!fm.Box.<ku.fs.file.OpenFlag>}
 */
ku.fs.file.OpenFlagInput;


/**
 * @param {string} path
 * @param {ku.fs.file.OpenFlagInput} flag
 * @param {number=} opt_mode
 * @return {fm.FileAction}
 */
ku.fs.file.open = function(path, flag, opt_mode) {
  /**
   * @param {function(fs.FileDescriptor)} complete
   * @param {fm.Cancel} cancel
   * @param {fm.Input} input
	 * @param {!fm.ExecContext=} opt_context
   */
  function action(complete, cancel, input, opt_context) {
    fs.open(path, flag, opt_mode, function (error, fd) {
      if (error === null) {
        complete(fd);
      } else {
        cancel('[ku.fs.file.open] ' + error.toString());
      }
    });
  }

  return action;
};


/**
 * @param {string} path
 * @return {fm.FileAction}
 */
ku.fs.file.openAppendRead = function(path) {
  return ku.fs.file.open(path, ku.fs.file.OpenFlag.APPEND_READ_WITH_CREATE);
};


/**
 * @param {string} path
 * @return {fm.FileAction}
 */
ku.fs.file.openReadWrite = function(path) {
  return ku.fs.file.open(path, ku.fs.file.OpenFlag.READ_WRITE_WITH_CREATE);
};


/**
 * @param {fm.StringInput} path
 * @return {fm.NumberAction}
 */
ku.fs.file.size = function(path) {
  /**
   * @param {function(number)} complete
   * @param {fm.Cancel} cancel
   * @param {fm.Input} input
	 * @param {!fm.ExecContext=} opt_context
	 */
  function action(complete, cancel, input, opt_context) {
    fs.stat(fm.unbox(path, opt_context), function(error, stats) {
      if (error === null) {
        complete(stats['size']);
      } else {
        cancel('[ku.fs.file.size] ' + error.toString());
      }
    });
  }

  return action;
};


/**
 * @param {fs.FileDescriptor} fd
 * @return {fm.NumberAction}
 */
ku.fs.file.fsize = function(fd) {
  /**
   * @param {function(number)} complete
   * @param {fm.Cancel} cancel
   * @param {fm.Input} input
	 * @param {!fm.ExecContext=} opt_context
   */
  function action(complete, cancel, input, opt_context) {
    fs.fstat(fd, function(error, stats) {
      if (error === null) {
        complete(stats['size']);
      } else {
        cancel('[ku.fs.file.fsize] ' + error.toString());
      }
    });
  }

  return action;
};


/**
 * @param {fs.FileDescriptor} fd
 * @param {!stream.Chunk} chunk
 * @return {fm.NumberAction}
 */
ku.fs.file.write = function(fd, chunk) {
	/**
	 * @param {function(number)} complete
	 * @param {fm.Cancel} cancel
	 * @param {fm.Input} input
	 * @param {!fm.ExecContext=} opt_context
	 */
	function action(complete, cancel, input, opt_context) {
		fs.write(fd, chunk, 0, chunk.length, function(error, written) {
      if (error === null) {
        complete(written);
      } else {
        cancel('[ku.fs.file.write] ' + error.toString());
      }
    });
  }

  return action;
};


/**
 * @param {fs.FileDescriptor} fd
 * @param {string} data
 * @return {fm.NumberAction}
 */
ku.fs.file.writeString = function(fd, data) {
	/**
	 * @param {function(number)} complete
	 * @param {fm.Cancel} cancel
	 * @param {fm.Input} input
	 * @param {!fm.ExecContext=} opt_context
	 */
	function action(complete, cancel, input, opt_context) {
		fs.write(fd, data, function(error, written) {
			if (error === null) {
				complete(written);
			} else {
				cancel('[ku.fs.file.writeString] ' + error.toString());
			}
		});
	}

	return action;
};


/**
 * @param {fm.FileInput} fd
 * @param {!fm.NumberInput} position
 * @param {!fm.NumberInput} length
 * @return {fm.ChunkAction}
 */
ku.fs.file.read = function(fd, position, length) {
  /**
   * @param {function(stream.Chunk)} complete
   * @param {fm.Cancel} cancel
   * @param {fm.Input} input
	 * @param {!fm.ExecContext=} opt_context
   */
  function action(complete, cancel, input, opt_context) {
    var buffer = new Buffer(fm.unboxNumber(length, opt_context));

    fm.do(fs.read, [fd, buffer, 0, length, position], opt_context, function(error, bytesRead, buf) {
      if (error === null) {
        complete(buf);
      } else {
        cancel('[ku.fs.file.read] ' + error.toString());
      }
    });
  }

  return action;
};


/**
 * @param {fm.FileInput} fd
 * @param {!fm.NumberInput} position
 * @param {!fm.NumberInput} length
 * @return {fm.StringAction}
 */
ku.fs.file.readString = function(fd, position, length) {
	/**
	 * @param {function(string)} complete
	 * @param {fm.Cancel} cancel
	 * @param {fm.Input} input
	 * @param {!fm.ExecContext=} opt_context
	 */
	function action(complete, cancel, input, opt_context) {
		ku.fs.file.read(fd, position, length)(function(buffer) {
			complete(buffer.toString('utf8'));
		}, cancel, input, opt_context);
	}

	return action;
};


/**
 * @param {fm.FileInput} fd
 * @param {!fm.NumberInput} position
 * @param {!fm.NumberInput} length
 * @return {fm.NumberAction}
 */
ku.fs.file.readNumber = function(fd, position, length) {
	/**
	 * @param {function(number)} complete
	 * @param {fm.Cancel} cancel
	 * @param {fm.Input} input
	 * @param {!fm.ExecContext=} opt_context
	 */
	function action(complete, cancel, input, opt_context) {
		ku.fs.file.read(fd, position, length)(function(buffer) {
			complete(Number(buffer.toString('utf8')));
		}, cancel, input, opt_context);
	}

	return action;
};


/**
 * @param {fs.FileDescriptor} fd
 * @return {fm.RegularAction}
 */
ku.fs.file.close = function(fd) {
	/**
	 * @param {fm.Complete} complete
	 * @param {fm.Cancel} cancel
	 * @param {fm.Input} input
	 * @param {!fm.ExecContext=} opt_context
	 */
	function action(complete, cancel, input, opt_context) {
    fs.close(fd, function(error) {
      if (error === null) {
        complete(input);
      } else {
        cancel('[ku.fs.file.close] ' + error.toString());
      }
    });
  }

  return action;
};
