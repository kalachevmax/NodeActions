

/**
 * @param {string} digestType
 * @return {fm.Action}
 */
act.hash.sha1 = function(digestType) {
  /**
   * @param {function(fm.Input)} complete
   * @param {function(string, number=)} cancel
   * @param {fm.Input} buffer
   */
  function hash(complete, cancel, buffer) {
    complete(crypto.createHash('sha1').update(buffer).digest(digestType));
  }

  return hash;
};
