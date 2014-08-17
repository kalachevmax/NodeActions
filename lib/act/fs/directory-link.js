

/**
 * @constructor
 * @implements {dm.ILink}
 * @param {string} path
 */
act.fs.DirectoryLink = function(path) {
  /**
   * @type {string}
   */
  this.__path = path;
};


/**
 * @inheritDoc
 */
act.fs.DirectoryLink.prototype.isValid = function(complete, cancel, input) {
  var self = this;

  act.fs.node.is.directory(function(isDir) {
    if (isDir) {
      complete(input);
    } else {
      cancel('[fs.DirectoryLink] path ' + self.__path + ' does not exists');
    }
  }, cancel, this.__path);
};


/**
 * @inheritDoc
 */
act.fs.DirectoryLink.prototype.retrieve = function(complete, cancel, input) {
  act.fs.tree.read(complete, cancel, this.__path);
};
