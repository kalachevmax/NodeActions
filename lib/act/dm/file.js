

/**
 * @constructor
 * @extends {dm.Entity}
 */
dm.File = function() {
  dm.Entity.call(this, dm.EntityType.FILE);

  this.string('path');
  this.fileContent('content');
  this.string('encoding', 'utf8');
  this.number('mode', 438);
  this.string('flag', 'w');
};

utils.inherit(dm.File, dm.Entity);


/**
 * @param {!Object} data
 */
dm.File.prototype.populate = function(data) {
  this.set('path', data['path']);
  this.set('content', data['content']);
  this.set('encoding', data['encoding']);
  this.set('mode', data['mode']);
  this.set('flag', data['flag']);
};


/**
 * @return {string}
 */
dm.File.prototype.getPath = function() {
  return this.getField('path').getValue();
};


/**
 * @return {fs.FileContent}
 */
dm.File.prototype.getContent = function() {
  return this.getField('content').getValue();
};


/**
 * @return {!Object}
 */
dm.File.prototype.getOptions = function() {
  return {
    encoding: this.getField('encoding').getValue(),
    mode: this.getField('mode').getValue(),
    flag: this.getField('flag').getValue()
  }
};


/**
 * @param {string} value
 * @return {dm.File}
 */
dm.File.prototype.setEncoding = function(value) {
  this.set('encoding', value);
  return this;
};


/**
 * @param {number} value
 * @return {dm.File}
 */
dm.File.prototype.setMode = function(value) {
  this.set('mode', value);
  return this;
};


/**
 * @param {string} value
 * @return {dm.File}
 */
dm.File.prototype.setFlag = function(value) {
  this.set('flag', value);
  return this;
};


/**
 * @param {fm.Action} action
 * @return {fm.Action}
 */
dm.File.prototype.retrieveContent = function(action) {
  function retrieveContent(complete, cancel, input) {
    action(complete, cancel, input);
  }

  return retrieveContent;
};
