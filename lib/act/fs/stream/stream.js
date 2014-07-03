

/**
 * @param {number} size
 * @param {fm.Action} action
 * @return {fm.Action}
 */
act.fs.stream.read = function(size, action) {
  /**
   * @param {function()} complete
   * @param {function(string, number=)} cancel
   * @param {string} fileinput
   */
  function read(complete, cancel, fileinput) {
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
