

/**
 * @constructor
 * @implements {dm.ITypeProvider}
 */
act.fs.TypeProvider = function() {

};


/**
 * @inheritDoc
 */
act.fs.TypeProvider.prototype.assert = function(name, type, value) {
  function assert(complete, cancel, input) {
    function checkDirectory() {
      act.fs.isDirectory(function(isDir) {
        if (isDir) {
          complete(input);
        } else {
          cancel('[TypeProvider] value type for symbol + ' + name +
              'is not ' + type);
        }
      }, cancel, value);
    }

    function checkFile() {
      act.fs.node.exists(function(isExists) {
        if (isExists) {
          complete(input);
        } else {
          cancel('[TypeProvider] value type for symbol + ' + name +
              'is not ' + type);
        }
      }, cancel, value);
    }


    switch (type) {
      case act.fs.Type.DIRECTORY:
        checkDirectory();
        break;

      case act.fs.Type.FILE:
        checkFile();
        break;

      default:
        cancel('[TypeProvider] type ' + type + ' for symbol + ' + name +
            'is not defined');
        break;
    }
  }

  return assert;
};


/**
 * @inheritDoc
 */
act.fs.TypeProvider.prototype.createLink = function(name, type, address) {
  switch (type) {
    case act.fs.Type.FILE:
      return new act.fs.FileLink(address);

    case act.fs.Type.DIRECTORY:
      return new act.fs.DirectoryLink(address);
  }

  return null;
};
