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
	requestUploadModule  = require("./uploadModule").uploadModule,
	requestClone         = require("./clone").clone,
	requestCompile       = require("./compile").compile,
	requestRegister      = require("./register").register;

/**
 * Exports.
 *
 * @since < 10.16.16
 */
exports = module.exports = {
	start                   : requestStart,
	uploadModule            : requestUploadModule,
	clone                   : requestClone,
	compile                 : requestCompile,
	register                : requestRegister
};