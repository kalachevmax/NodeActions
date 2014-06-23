

/**
 * @param {string} command
 * @return {fm.Action}
 */
act.proc.exec = function(command) {
  return function(opt_options, complete, cancel) {
    childProcess.exec(command, opt_options, function (error, stdout, stderr) {
      console.log(stdout);
      console.log(stderr);

      if (error === null) {
        complete();
      } else {
        cancel('[act.proc.exec]: ' + error.toString());
      }
    });
  }
};
