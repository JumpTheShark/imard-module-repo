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
	queryString = require("querystring"),
	request     = require("request"),
	constants   = require("../constants"),
	global      = require("../GlobalConfiguraition");


/***
 * Constants.
 *
 * @since < 10.16.16
 */
const
	REDIRECT_TIMEOUT        = constants.REDIRECT_TIMEOUT,
	CONTENT_TYPE_TEXT_PLAIN = constants.CONTENT_TYPE_TEXT_PLAIN,
	STATUS_CODE_OK          = constants.STATUS_CODE_OK,
	STATUS_CODE_BAD         = constants.STATUS_CODE_BAD,
	LINK_INPUT_FIELD_NAME   = constants.LINK_INPUT_FIELD_NAME,
	PUT_STR                 = "PUT",
	POST_STR                = "POST",
	NO_LINK_STR             = "no link given to clone",
	INAPPROPRIATE_LINK_STR  = "link given in inappropriate way",
	REPO_NAME               = constants.CLONED_REPO_FOLDER_NAME;

/**
 * Url redirect string functions.
 * As the port may be changed in the process of working, there are functions instead of constants.
 *
 * @return {string} string with redirect address
 * @since 07.11.16
 */
const
	cloneURL    = () => `http://localhost:${global.config.getPort()}/clone`,
	compileURL  = () => `http://localhost:${global.config.getPort()}/compile`,
	registerURL = () => `http://localhost:${global.config.getPort()}/register`;

/**
 * The request itself. Calls internally clone, compile and register requests.
 *
 * @param {function(object)} inject response inject function to put request reply in
 * @param {string} postData request body. Must contain the repository link
 * @return {void} nothing
 * @since < 10.16.16
 */
const uploadModule = (inject, postData) => {
	let outString = "";

	if (!postData) {
		inject(STATUS_CODE_BAD, CONTENT_TYPE_TEXT_PLAIN, NO_LINK_STR);
		return;
	}

	const link = queryString.parse(postData)[LINK_INPUT_FIELD_NAME];

	if (!link) {
		inject(STATUS_CODE_BAD, CONTENT_TYPE_TEXT_PLAIN, INAPPROPRIATE_LINK_STR);
		return;
	}

	request({
		uri     : cloneURL(),
		qs      : { link : link },
		method  : PUT_STR,
		timeout : REDIRECT_TIMEOUT
	},
	(err, resp, _) => {
		if (!err && resp && resp.statusCode === STATUS_CODE_OK) {
			outString += "cloned: true\n";

			request({
				uri:     compileURL(),
				method:  POST_STR,
				body:    REPO_NAME,
				timeout: REDIRECT_TIMEOUT
			},
			(err2, resp2, body2) => {
				if (!err2 && resp2 && resp2.statusCode === STATUS_CODE_OK) {
					outString += "built: true\n";

					request({
						uri:     registerURL(),
						method:  POST_STR,
						timeout: REDIRECT_TIMEOUT
					},
					(err3, resp3, body3) => {
						if (!err2 && resp2 && resp2.statusCode === STATUS_CODE_OK)
							inject(STATUS_CODE_OK, CONTENT_TYPE_TEXT_PLAIN, outString + "registered: true");
						else
							inject(`${outString}registered: false ${body3}`);
					});
				} else
					inject(`${outString}built: false ${body2 ? `(${body2})` : `(${err2})`}`);
			});
		} else
			inject(`cloned: false (error: ${String(err)})`);
	});
};

/**
 * Exports.
 *
 * @since < 10.16.16
 */
exports = module.exports = { uploadModule : uploadModule };