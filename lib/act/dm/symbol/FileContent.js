

/**
 * @constructor
 * @extends {dm.symbol.Atom}
 */
act.dm.symbol.FileContent = function(name, opt_value) {
  dm.symbol.Atom.call(this, name, act.Type.FILE_CONTENT, opt_value);
};

utils.inherit(act.dm.symbol.FileContent, dm.symbol.Atom);
