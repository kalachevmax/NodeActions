

/**
 * @param {function(fs.FileContent)} complete
 * @param {function(string, number=)} cancel
 * @param {!act.dm.File} file
 */
act.fs.file.read = function(complete, cancel, file) {
  fs.readFile(file.getPath(), file.getOptions(), function(error, data) {
    if (error === null) {
      complete(data);
    } else {
      cancel('[act.fs.file.read] ' + error.toString());
    }
  });
};


/**
 * @param {function(fs.FileContent)} complete
 * @param {function(string, number=)} cancel
 * @param {string} path
 */
act.fs.file.remove = function(complete, cancel, path) {
  fs.unlink(path, function(error) {
    if (error === null) {
      complete(path);
    } else {
      cancel('[act.fs.file.remove] ' + error.toString());
    }
  });
};


/**
 * @param {function(fs.FileContent)} complete
 * @param {function(string, number=)} cancel
 * @param {string} path
 */
act.fs.file.safeRemove = function(complete, cancel, path) {
  act.fs.file.remove(complete, function() {
    fm.script([
      act.fs.node.chmod(511),
      act.fs.file.remove
    ])(function() {
      complete(path);
    }, cancel, path);
  }, path);
};


/**
 * @param {function(fs.FileContent)} complete
 * @param {function(string, number=)} cancel
 * @param {!act.dm.File} file
 */
act.fs.file.append = function(complete, cancel, file) {
/*
  fs.appendFile(filename, content, function (error, data) {
    if (error === null) {
      complete(data);
    } else {
      cancel('[act.fs.file.appendTo] ' + filename + ': ' + error.toString());
    }
  });
*/
};


/**
 * @param {function(!act.fs.File)} complete
 * @param {function(string, number=)} cancel
 * @param {fm.Type.File} File
 */
act.fs.file.write = function write(complete, cancel, File) {
  fs.writeFile(File.Path, File.Content.Body,
      {encoding: File.Content.Encoding, mode: File.Mode}, function(error) {
    if (error === null) {
      complete(file);
    } else {
      cancel('[act.fs.file.write]: ' + error.toString());
    }
  });
};


/**
 * @param {fm.FileBox} file
 * @return {fm.NumberAction}
 */
act.fs.file.getSize = function(file) {
  /**
   * @param {function(number)} complete
   * @param {fm.CancelHandler} cancel
   * @param {fm.Input} input
   */
  function action(complete, cancel, input) {
    fs.fstat(file.get(), function(error, stats) {
      if (error === null) {
        complete(stats['size']);
      } else {
        cancel('[act.fs.file.getSize] ' + error.toString());
      }
    });
  }

  return action;
};


/**
 * @param {fm.StringBox} path
 * @param {act.fs.file.OpenFlag} flag
 * @param {number=} opt_mode
 * @return {fm.FileAction}
 */
act.fs.file.open = function(path, flag, opt_mode) {
  /**
   * @param {function(fs.FileDescriptor)} complete
   * @param {fm.Cancel} cancel
   * @param {fm.Input} input
   */
  function action(complete, cancel, input) {
    fs.open(path.get(), flag, opt_mode, function(error, fd) {
      if (error === null) {
        complete(fd);
      } else {
        cancel('[act.fs.file.open] ' + error.toString());
      }
    });
  }

  return action;
};


/**
 * @param {fm.StringBox} path
 * @return {fm.FileAction}
 */
act.fs.file.openAppendRead = function(path) {
  return act.fs.file.open(path, act.fs.file.OpenFlag.APPEND_READ_WITH_CREATE);
};
