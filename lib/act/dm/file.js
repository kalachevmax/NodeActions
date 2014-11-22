

/**
 * @constructor
 * @extends {act.dm.Entity}
 */
act.dm.File = function() {
  dm.Entity.call(this, dm.EntityType.FILE);

  this.string('path');
  this.fileContent('content');
  this.string('encoding', 'utf8');
  this.number('mode', 438);
  this.string('flag', 'w');
};

utils.inherit(act.dm.File, dm.Entity);


/**
 * @param {!Object} data
 */
act.dm.File.prototype.populate = function(data) {
  this.set('path', data['path']);
  this.set('content', data['content']);
  this.set('encoding', data['encoding']);
  this.set('mode', data['mode']);
  this.set('flag', data['flag']);
};


/**
 * @return {string}
 */
act.dm.File.prototype.getPath = function() {
  return this.getField('path').getValue();
};


/**
 * @return {fs.FileContent}
 */
act.dm.File.prototype.getContent = function() {
  return this.getField('content').getValue();
};


/**
 * @return {!Object}
 */
act.dm.File.prototype.getOptions = function() {
  return {
    encoding: this.getField('encoding').getValue(),
    mode: this.getField('mode').getValue(),
    flag: this.getField('flag').getValue()
  }
};
