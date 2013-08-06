/**
 * debug.js
 *
 * @module RwDebug
 */

/**
 * Module dependencies.
 */
var Debug = require('./libs/Debug.js');

/**
 * Initialize module
 */

/**
 * Environment
 */
module.exports.env = process.env.NODE_ENV || 'dev';

/**
 * Module name.
 */
module.exports.fullname = "RwDebug";

/**
 * Module version.
 */
module.exports.version = '0.1.0';

/**
 * Exports Arrays
 */
module.exports.Debug = Debug;
