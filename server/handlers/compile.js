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
	constants = require("../constants"),
	config    = require("../GlobalConfiguraition").config,
	utils     = require("../utils");

/***
 * Constants.
 *
 * @since < 10.16.16
 */
const
	CONTENT_TYPE_TEXT_PLAIN = constants.CONTENT_TYPE_TEXT_PLAIN,
	STATUS_CODE_OK          = constants.STATUS_CODE_OK,
	COMMAND_BUILD           = constants.COMMAND_BUILD,
	BUILD_PATH              = constants.BUILT_REPO_FOLDER_NAME,
	BUILD_COMPLETED_STR     = "build completed.";

/**
 * The request itself. Creates useful data for the given new module (after cloning).
 *
 * @param {function(object)} inject response inject function to put request reply in
 * @param {string} _ request body. Not used
 * @return {void} nothing
 * @since < 10.16.16
 */
const compile = (inject, _) => {
	const build = () =>
		exec(`${COMMAND_BUILD} ${config.getClonedRepoPath()} ${BUILD_PATH}`, (__, out, err) => {
			if (!err) {
				log(BUILD_COMPLETED_STR);
				inject(STATUS_CODE_OK, CONTENT_TYPE_TEXT_PLAIN, BUILD_COMPLETED_STR);
			} else
				inject(`error: ${out}`);
		});

	utils.removeBuiltRepo().then(build, build);
};

/**
 * Exports.
 *
 * @since < 10.16.16
 */
exports = module.exports = { compile : compile };