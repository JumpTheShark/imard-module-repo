/****************************
 * Module for union all the requests.
 *
 * @author GlaDos
 * @since < 10.16.16
 ****************************/

"use strict";

/***
 * Imports.
 *
 * @since < 10.16.16
 */
const
	requestStart         = require("./start").start,
	requestCloneRedirect = require("./cloneRedirect").cloneRedirect,
	requestClone         = require("./clone").clone,
	requestCompile       = require("./compile").compile;

/**
 * Exports.
 *
 * @since < 10.16.16
 */
exports = module.exports = {
	start                   : requestStart,
	cloneRedirect           : requestCloneRedirect,
	clone                   : requestClone,
	compile                 : requestCompile
};