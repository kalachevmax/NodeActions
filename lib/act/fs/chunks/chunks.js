

/**
 * @param {string} filename
 * @param {number} size
 * @return {fm.Action}
 */
act.fs.chunks.read = function(filename, size) {
  return function(complete, cancel) {
    var result = [];
    var stream = fs.createReadStream(filename);

    stream.on('readable', handleReadable);
    stream.on('end', handleEnd);
    stream.on('error', handleError);

    function handleReadable() {
      var chunk;

      while ((chunk = stream.read(size)) !== null) {
        result.push(chunk);
      }
    }

    function handleEnd() {
      complete(result);
    }

    function handleError(error) {
      cancel(error.toString);
    }
  }
};
