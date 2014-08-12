

var fs = require('fs');
var path = require('path');
var crypto = require('crypto');
var childProcess = require('child_process');
var fm = require('../../deps/semantic.fm/bin/semantic.fm.js');
var dm = require('../../deps/semantic.dm/bin/semantic.dm.js');


/**
 * @namespace
 */
var act = {};


/**
 * @namespace
 */
act.fs = {};


/**
 * @namespace
 */
act.fs.dir = {};


/**
 * @namespace
 */
act.fs.dir.read = {};


/**
 * @namespace
 */
act.fs.file = {};


/**
 * @namespace
 */
act.fs.tree = {};


/**
 * @namespace
 */
act.fs.node = {};


/**
 * @namespace
 */
act.fs.node.is = {};


/**
 * @namespace
 */
act.stream = {};


/**
 * @namespace
 */
act.proc = {};


/**
 * @namespace
 */
act.hash = {};
