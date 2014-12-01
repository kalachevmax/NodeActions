

/**
 * @typedef {string|!Buffer}
 */
act.fs.FileContent;


/**
 * @param {function(!act.dm.File)} complete
 * @param {function(string, number=)} cancel
 * @param {!dm.File} file
 */
act.fs.write =
  fm.script({path: fm.Type.STRING, content: fm.Type.FILE_CONTENT, options: fm.Type.OBJECT}, [
    act.fs.file.write(fm.var('path'), fm.var('content'), fm.var('options'))
  ]);


/**
 * @type {fm.Action}
 */
act.fs.concat = fm.script({sources: fm.Type.ARRAY.STRING, target: fm.Type.STRING}, [
  fm.new.FileContent(act.fs.concatFileContents(fm.var('sources'))),
  fm.act(act.fs.file.write, {content: fm.get.FileContent(), target: fm.var('target')})
]);


/**
 * @type {fm.Action}
 */
act.fs.concatFileContents = fm.script({sources: fm.Type.ARRAY.STRING}, [

], fm.Type.FILE_CONTENT);
