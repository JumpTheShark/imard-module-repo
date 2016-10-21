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
	log       = require("../../self_modules/logger/logger").log,
	constants = require("../constants");

/***
 * Constants.
 *
 * @since < 10.16.16
 */
const
	CONTENT_TYPE_TEXT_PLAIN = constants.CONTENT_TYPE_TEXT_PLAIN,
	STATUS_CODE_BAD         = constants.STATUS_CODE_BAD,
	STATUS_CODE_OK          = constants.STATUS_CODE_OK,
	NOT_SUPPORTED_STR       = "not supported yet.",
	BUILD_COMPLETED_STR     = "build completed.",
	NO_LINK_STR             = "no link given.",
	COMMAND_BUILD           = "./imard-build ",
	BUILD_PATH              = "test-build";

/**
 * The request itself. Creates useful data for the given new module (after cloning).
 *
 * @param {function(object)} inject response inject function to put request reply in
 * @param {string} postData request body. Must contain the link to the folder to compile
 * @return {null} nothing
 * @since < 10.16.16
 */
const compile = (inject, postData) => {
	if (postData === null) {
		inject(STATUS_CODE_BAD, CONTENT_TYPE_TEXT_PLAIN, NO_LINK_STR);
		return;
	}

	exec(COMMAND_BUILD + postData + " " + BUILD_PATH, (_, out, err) => {
		if (err === null) {
			log(BUILD_COMPLETED_STR);
			inject(STATUS_CODE_OK, CONTENT_TYPE_TEXT_PLAIN, NOT_SUPPORTED_STR);
		} else
			inject(STATUS_CODE_BAD, CONTENT_TYPE_TEXT_PLAIN, `error: ${err}`);
	});
};

/**
 * Exports.
 *
 * @since < 10.16.16
 */
exports = module.exports = { compile : compile };