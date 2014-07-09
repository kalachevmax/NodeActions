

/**
 * @constructor
 * @implements {dm.ILink}
 * @param {string} path
 */
act.fs.FileLink = function(path) {
  /**
   * @type {string}
   */
  this.__path = path;
};


/**
 * @inheritDoc
 */
act.fs.FileLink.prototype.isValid = function(complete, cancel, input) {
  var self = this;

  act.fs.node.exists(function(isExists) {
    if (isExists) {
      complete(input);
    } else {
      cancel('[fs.FileLink] path ' + self.__path + ' does not exists');
    }
  }, cancel, this.__path);
};


/**
 * @inheritDoc
 */
act.fs.FileLink.prototype.retrieve = function(complete, cancel, input) {
  act.fs.file.read(complete, cancel, this.__path);
};
