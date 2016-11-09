/****************************
 * Request 'upload-module' [POST].
 * Takes the given link to the repository with module, clones, builds and registers it on the server.
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
	queryString     = require("querystring"),
	log             = require("../../self_modules/logger/logger").log,
	cloneHandler    = require("./clone").clone,
	compileHandler  = require("./compile").compile,
	registerHandler = require("./register").register,
	constants       = require("../constants"),
	requestAsync    = require("../utils").requestAsync,
	co              = require("co");

/***
 * Constants.
 *
 * @since < 10.16.16
 */
const
	TEXT_PLAIN             = constants.TEXT_PLAIN,
	STATUS_CODE_OK         = constants.STATUS_CODE_OK,
	LINK_INPUT_FIELD_NAME  = constants.LINK_INPUT_FIELD_NAME,
	REPO_NAME              = constants.CLONED_REPO_FOLDER_NAME,
	NO_LINK_STR            = "no link given to clone",
	INAPPROPRIATE_LINK_STR = "link given in inappropriate way";

/**
 * The request itself. Calls internally clone, compile and register requests.
 *
 * @param {function(object)} inject response inject function to put request reply in
 * @param {string} postData request body. Must contain the repository link
 * @return {void} nothing
 * @since < 10.16.16
 */
const uploadModule = (inject, postData) => {
	if (!postData) {
		inject(NO_LINK_STR);
		return;
	}

	const link = queryString.parse(postData)[LINK_INPUT_FIELD_NAME];

	if (!link) {
		inject(INAPPROPRIATE_LINK_STR);
		return;
	}

	co(function *() {
		yield requestAsync(cloneHandler, { link : link });
		yield requestAsync(compileHandler, REPO_NAME);
		yield requestAsync(registerHandler);
		inject(STATUS_CODE_OK, TEXT_PLAIN, `cloned: true\nbuilt: true\nregistered: true`);
	}).catch((err) => {
		log(`error: ${JSON.stringify(err)}`);
		inject(err.statusCode, err.contentType, err.body);
	});
};

/**
 * Exports.
 *
 * @since < 10.16.16
 */
exports = module.exports = { uploadModule : uploadModule };