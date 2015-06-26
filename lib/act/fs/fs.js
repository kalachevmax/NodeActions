

/**
 * @param {!fm.ChunkInput} chunk
 * @return {fm.NumberAction}
 */
act.fs.getBufferSize = function(chunk) {
	/**
	 * @param {function(number)} complete
	 * @param {fm.Cancel} cancel
	 * @param {fm.Input} input
	 * @param {!fm.ExecContext=} opt_context
	 */
	function action(complete, cancel, input, opt_context) {
		complete(fm.unbox(chunk, opt_context).length);
	}

	return action;
};
