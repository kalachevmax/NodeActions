

/**
 * @typedef {string|!Buffer}
 */
act.fs.FileContent;


/**
 * @param {!FileNamesList} fileNamesList
 * @param {!TargetFileName} targetFileName
 * @return {fm.Action|function(function(), function(string, number=), fm.Input)}
 */
act.fs.concat = function(fileNamesList, targetFileName) {
  /**
   * @param {function()} complete
   * @param {function(string, number=)} cancel
   * @param {fm.Input} input
   */
  function concat(complete, cancel, input) {
    fm.script([
      File(
        FileContent(
          FileBody(fm.script([
            FileBodyList(List(Str, fileNamesList)),
            fm.fold
          ])),

          FileEncoding('utf8')
        ),

        FilePath(Str(targetFileName)),
        FileMode(438)
      ),

      fm.save
    ])(complete, cancel);
  }

  return concat;
};
