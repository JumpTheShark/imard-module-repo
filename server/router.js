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
const log = require("../self_modules/logger/logger").log;

/***
 * Constants.
 *
 * @since < 10.16.16
 */
const CODE_NOT_FOUND          = 404,
      NOT_FOUND_BODY_STR      = CODE_NOT_FOUND + ' Not found',
      FUNCTION_STR            = 'function',
      GET_STR                 = 'get',
      POST_STR                = 'post',
      PUT_STR                 = 'put',
      CONTENT_TYPE_TEXT_PLAIN = { 'Content-Type' : 'text/plain' };

/**
 * Router function that handles the given url with all needed data.
 * Calls a request handler whether the last found for the specified url.
 *
 * @param handle object with request handlers
 * @param method request method
 * @param pathname request url
 * @param response response to put request reply in
 * @param params request parameters (after '?'). For [PUT] requests only
 * @param postData request body. For [POST] requests only
 * @since < 10.16.16
 */
function route(handle, method, pathname, response, params, postData) {
	const displayPath = pathname + " [" + method + "]",
	      methodIsDefined = method != undefined;
	
	if (methodIsDefined)
		method = method.toLowerCase();
	
	if (methodIsDefined
         && handle[method] != undefined
         && typeof handle[method][pathname] == FUNCTION_STR) {
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
				console.log("Unknown method '" + method + "'.");
		}
	} else {
		log("No request handler found for " + displayPath + ".");
		response.writeHead(CODE_NOT_FOUND, CONTENT_TYPE_TEXT_PLAIN);
		response.write(NOT_FOUND_BODY_STR);
		response.end();
	}
}

/***
 * Exports.
 *
 * @since < 10.16.16
 */
exports = module.exports = {
	route                   : route,
	CONTENT_TYPE_TEXT_PLAIN : CONTENT_TYPE_TEXT_PLAIN,
	STATUS_CODE_NOT_FOUND   : CODE_NOT_FOUND //$test$
};