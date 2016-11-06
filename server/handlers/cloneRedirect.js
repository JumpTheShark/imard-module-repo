/****************************
 * Request 'clone-redirect' [POST]. Redirects to the clone request.
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
	request   = require("request"),
	constants = require("../constants"),
	global    = require("../GlobalConfiguraition");


/***
 * Constants.
 *
 * @since < 10.16.16
 */
const
	REDIRECT_URL            = `http://localhost:${global.config.getPort()}/clone`,
	REDIRECT_TIMEOUT        = constants.REDIRECT_TIMEOUT,
	CONTENT_TYPE_TEXT_PLAIN = constants.CONTENT_TYPE_TEXT_PLAIN,
	STATUS_CODE_BAD         = constants.STATUS_CODE_BAD,
	PUT_STR                 = "PUT",
	NO_LINK_STR             = "no link given to clone";

/**
 * The request itself. Redirects internally to the clone request.
 * The reason is not supported [PUT] method from the HTML content.
 *
 * @param {function(object)} inject response inject function to put request reply in
 * @param {string} postData request body. Must contain the repository link
 * @return {null} nothing
 * @since < 10.16.16
 */
const cloneRedirect = (inject, postData) => {
	const error = (err, resp, _) => {
		if (resp)
			inject(resp.statusCode, resp.headers, resp.body);
		else
			inject(STATUS_CODE_BAD, CONTENT_TYPE_TEXT_PLAIN, String(err));
	};

	if (!postData)
		error(NO_LINK_STR, null, null);
	else
		request({
			uri     : REDIRECT_URL,
			qs      : { link : postData },
			method  : PUT_STR,
			timeout : REDIRECT_TIMEOUT
		}, error);
};

/**
 * Exports.
 *
 * @since < 10.16.16
 */
exports = module.exports = { cloneRedirect : cloneRedirect };