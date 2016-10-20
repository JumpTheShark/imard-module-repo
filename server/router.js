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
	constants = require("./constants");

/***
 * Constants.
 *
 * @since < 10.16.16
 */
const
	CODE_NOT_FOUND          = constants.STATUS_CODE_NOT_FOUND,
	NOT_FOUND_BODY_STR      = constants + " Not found",
	FUNCTION_STR            = "function",
	GET_STR                 = "get",
	POST_STR                = "post",
	PUT_STR                 = "put",
	CONTENT_TYPE_TEXT_PLAIN = { "Content-Type": "text/plain" };

/**
 * Router function that handles the given url with all needed data.
 * Calls a request handler whether the last found for the specified url.
 *
 * @param {object} handle object with request handlers
 * @param {string} _method request method
 * @param {string} pathname request url
 * @param {object} response response to put request reply in
 * @param {string} params request parameters (after '?'). For [PUT] requests only
 * @param {string} postData request body. For [POST] requests only
 * @return {null} nothing
 * @since < 10.16.16
 */
const route = (handle, _method, pathname, response, params, postData) => {
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
			handle[method][pathname](response);
			break;
		case POST_STR:
			handle[method][pathname](response, postData);
			break;
		case PUT_STR:
			handle[method][pathname](response, params);
			break;
		default:
			log("Unknown method '" + method + "'.");
		}
	} else {
		log("No request handler found for " + displayPath + ".");
		response.writeHead(CODE_NOT_FOUND, CONTENT_TYPE_TEXT_PLAIN);
		response.write(NOT_FOUND_BODY_STR);
		response.end();
	}
};

/***
 * Exports.
 *
 * @since < 10.16.16
 */
exports = module.exports = { route : route };