

/**
 * @constructor
 * @implements {dm.ITypeProvider}
 */
act.fs.TypeProvider = function() {};


/**
 * @inheritDoc
 */
act.fs.TypeProvider.prototype.getDefaultValue = function(type) {
  switch (type) {
    case act.Type.FILE_CONTENT:
      return '';
  }

  return null;
};


/**
 * @inheritDoc
 */
act.fs.TypeProvider.prototype.typeof = function(value, type) {
  switch (type) {
    case act.Type.FILE_CONTENT:
      return typeof value === 'string' || value instanceof Buffer;
  }

  return false;
};


/**
 * @inheritDoc
 */
act.fs.TypeProvider.prototype.assert = function(name, type, value) {
  function assert(complete, cancel, input) {
    function checkDirectory() {
      if (typeof value === 'string') {
        act.fs.node.is.directory(function(isDir) {
          if (isDir) {
            complete(input);
          } else {
            cancel('[act.fs.TypeProvider] value type for symbol + ' + name +
            'is not ' + type);
          }
        }, cancel, value);
      } else {
        cancel('[act.fs.TypeProvider] type of path ' + value +
        ' is not ' + dm.Type.STRING);
      }
    }

    function checkFile() {
      if (typeof value === 'string') {
        act.fs.node.exists(function(isExists) {
          if (isExists) {
            complete(input);
          } else {
            cancel('[TypeProvider] value type for symbol + ' + name +
            'is not ' + type);
          }
        }, cancel, value);
      } else {
        cancel('[act.fs.TypeProvider] type of path ' + value +
        ' is not ' + dm.Type.STRING);
      }
    }

    switch (type) {
      case act.Type.DIR:
        checkDirectory();
        break;

      case act.Type.FILE:
        checkFile();
        break;

      case act.Type.FILE_CONTENT:
        complete(typeof value === 'string' || value instanceof Buffer);
        break;

      default:
        cancel('[act.fs.TypeProvider] type ' + type + ' for symbol + ' + name +
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
    case act.Type.FILE:
      return new act.fs.FileLink(address);

    case act.Type.DIR:
      return new act.fs.DirectoryLink(address);
  }

  return null;
};
