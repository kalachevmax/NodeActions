

/**
 * @constructor
 * @extends {dm.Entity}
 * @param {dm.EntityType} type
 * @param {!dm.IEntity=} opt_parent
 */
act.dm.Entity = function(type, opt_parent) {
  dm.Entity.call(this, type, opt_parent);
};

utils.inherit(act.dm.Entity, dm.Entity);


/**
 * @param {string} name
 * @param {dm.Value=} opt_value
 */
act.dm.Entity.prototype.fileContent = function(name, opt_value) {
  this.setField(name, new act.dm.symbol.FileContent(name, opt_value));
};
