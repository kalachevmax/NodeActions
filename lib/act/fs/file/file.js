

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
