/****************************
 * Request 'compile' [POST]. Builds the given code.
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
	//exec            = require("child_process").exec, TODO uncomment
	requestHandlers = require("./requestHandlers");

/***
 * Constants.
 *
 * @since < 10.16.16
 */
const
	NOT_SUPPORTED_STR       = "not supported yet.",
	CONTENT_TYPE_TEXT_PLAIN = requestHandlers.CONTENT_TYPE_TEXT_PLAIN,
	STATUS_CODE_BAD         = requestHandlers.STATUS_CODE_BAD;

/**
 * The request itself. Creates useful data for the given new module (after cloning).
 *
 * @param {object} response variable to write the reply to
 * @param {string} postData request body. Must contain the link to the folder to compile
 * @return {null} nothing
 * @since < 10.16.16
 */
const compile = (response, postData) => {
	// TODO complete the request
	response.writeHead(STATUS_CODE_BAD, CONTENT_TYPE_TEXT_PLAIN);
	response.end(NOT_SUPPORTED_STR);
};

/**
 * Exports.
 *
 * @since < 10.16.16
 */
exports = module.exports = { compile : compile };