

/**
 * @param {string} targetFilename
 * @returns {fm.Action|function()}
 */
act.fs.files.concat = function(targetFilename) {
  /**
   * @param {function(!Array.<string>)} complete
   * @param {function(string, number=)} cancel
   * @param {!Array.<string>} filenames
   */
  function concat(complete, cancel, filenames) {
    fm.each(fm.script([
      act.fs.file.read,
      act.fs.file.appendTo(targetFilename)
    ]))(function () {
      complete(filenames);
    }, cancel, filenames);
  }

  return concat;
};
