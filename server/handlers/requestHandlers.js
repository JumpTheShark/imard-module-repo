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
const requestStart         = require("./start").start,
	  requestCloneRedirect = require("./cloneRedirect").cloneRedirect,
	  requestClone         = require("./clone").clone,
	  requestCompile       = require("./compile").compile;

/***
 * Constants.
 *
 * @since < 10.16.16
 */
const CONTENT_TYPE_TEXT_PLAIN = { "Content-Type" : "text/plain" },
      STATUS_CODE_OK          = 200,
      STATUS_CODE_BAD         = 400;

/**
 * Exports.
 *
 * @since < 10.16.16
 */
exports = module.exports = {
	CONTENT_TYPE_TEXT_PLAIN : CONTENT_TYPE_TEXT_PLAIN,
	STATUS_CODE_OK          : STATUS_CODE_OK,
	STATUS_CODE_BAD         : STATUS_CODE_BAD,
	start                   : requestStart,
	cloneRedirect           : requestCloneRedirect,
	clone                   : requestClone,
	compile                 : requestCompile
};

console.log(exports.cloneRedirect); // TODO remove the plug