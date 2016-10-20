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
	exec      = require("child_process").exec,
	constants = require("../constants");

/***
 * Constants.
 *
 * @since < 10.16.16
 */
const
	NOT_SUPPORTED_STR       = "not supported yet.",
	//BUILD_COMPLETED_STR     = "built completed.", TODO uncomment the line
	NO_LINK_STR             = "no link given.",
	CONTENT_TYPE_TEXT_PLAIN = constants.CONTENT_TYPE_TEXT_PLAIN,
	STATUS_CODE_BAD         = constants.STATUS_CODE_BAD,
	STATUS_CODE_OK          = constants.STATUS_CODE_OK,
	COMMAND_BUILD           = " "; /* TODO build command */

/**
 * The request itself. Creates useful data for the given new module (after cloning).
 *
 * @param {object} response variable to write the reply to
 * @param {string} postData request body. Must contain the link to the folder to compile
 * @return {null} nothing
 * @since < 10.16.16
 */
const compile = (response, postData) => {
	if (postData === null) {
		response.writeHead(STATUS_CODE_BAD, CONTENT_TYPE_TEXT_PLAIN);
		response.end(NO_LINK_STR);
		return;
	}

	exec(COMMAND_BUILD + postData, (_, out, err) => {
		if (err === null) {
			response.writeHead(STATUS_CODE_OK, CONTENT_TYPE_TEXT_PLAIN);
			response.end(NOT_SUPPORTED_STR);
		} else {
			response.writeHead(STATUS_CODE_BAD, CONTENT_TYPE_TEXT_PLAIN);
			response.end("error: " + err);
		}
	});
};

/**
 * Exports.
 *
 * @since < 10.16.16
 */
exports = module.exports = { compile : compile };