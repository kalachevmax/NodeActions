

/**
 * @param {string} name
 * @param {dm.Value=} opt_value
 */
dm.Entity.prototype.fileContent = function(name, opt_value) {
  this.setField(name, new act.dm.symbol.FileContent(name, opt_value));
};
