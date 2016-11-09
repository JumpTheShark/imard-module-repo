/****************************
 * Server router. Routs the url and calls the appropriate request handler.
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
	log       = require("../self_modules/logger/logger").log,
	qs        = require("querystring"),
	constants = require("./constants");

/***
 * Constants.
 *
 * @since < 10.16.16
 */
const
	CODE_NOT_FOUND     = constants.STATUS_CODE_NOT_FOUND,
	CODE_BAD           = constants.STATUS_CODE_BAD,
	TEXT_PLAIN         = constants.TEXT_PLAIN,
	NOT_FOUND_BODY_STR = `${CODE_NOT_FOUND} Not found`,
	NULL_PARAMS_STR    = "null query parameters",
	BAD_PARAMS_STR     = "bad query parameters",
	FUNCTION_STR       = "function",
	GET_STR            = "get",
	POST_STR           = "post",
	PUT_STR            = "put";

/**
 * Router function that handles the given url with all needed data.
 * Calls a request handler whether the last found for the specified url.
 *
 * @param {object} handle object with request handlers
 * @param {string} _method request method
 * @param {string} pathname request url
 * @param {function(object)} inject response inject function to put request reply in
 * @param {string} params request parameters (after '?'). For [PUT] requests only
 * @param {string} postData request body. For [POST] requests only
 * @return {null} nothing
 * @since < 10.16.16
 */
const route = (handle, _method, pathname, inject, params, postData) => {
	const
		displayPath = pathname + " [" + _method + "]",
		methodIsDefined = _method !== undefined;

	const method = methodIsDefined ? _method.toLowerCase() : _method;

	if (methodIsDefined &&
			handle[method] !== undefined &&
			typeof handle[method][pathname] === FUNCTION_STR) {
		log("Process a request for " + displayPath + ".");

		switch (method) {
		case GET_STR:
			handle[method][pathname](inject);
			break;
		case POST_STR:
			handle[method][pathname](inject, postData);
			break;
		case PUT_STR:
			if (params === null)
				inject(CODE_BAD, TEXT_PLAIN, NULL_PARAMS_STR);
			else {
				const _params = qs.parse(params);

				if (_params === null)
					inject(CODE_BAD, TEXT_PLAIN, BAD_PARAMS_STR);
				else
					handle[method][pathname](inject, _params);
			}

			break;
		default:
		}
	} else {
		log("No request handler found for " + displayPath + ".");
		inject(CODE_NOT_FOUND, TEXT_PLAIN, NOT_FOUND_BODY_STR);
	}
};

/***
 * Exports.
 *
 * @since < 10.16.16
 */
exports = module.exports = { route : route };