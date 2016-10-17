/****************************
 * Server core. Creates and activates a request listener with all needed instruments.
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
	http = require("http"),
	url  = require("url"),
	log = require("../self_modules/logger/logger").log;

/***
 * Constants.
 *
 * @since < 10.16.16
 */
const
	PORT     = 8888,
	ENCODING = "utf8";

/**
 * Starts a server by the given route function and collection of request handlers.
 *
 * @param {function} route router function to parse the url
 * @param {object} handle object with request handlers
 * @return {null} nothing
 * @since < 10.16.16
 */
const start = (route, handle) => {
	http.createServer((request, response) => {
		let postData = "";

		request.setEncoding(ENCODING);

		const
			method = request.method,
			parsed = url.parse(request.url),
			pathname = parsed.pathname,
			params = parsed.query;

		request.addListener("data", (postDataChunk) => {
			postData += postDataChunk;
			log("Received POST data chunk '" + postDataChunk + "'.");
		});

		request.addListener("end", () => {
			route(handle, method, pathname, response, params, postData);
		});
	}).listen(PORT);

	log("Server has started on the port " + PORT + ".");
};

/***
 * Exports.
 *
 * @since < 10.16.16
 */
exports = module.exports = {
	start : start,
	PORT  : PORT /*$test$*/
};