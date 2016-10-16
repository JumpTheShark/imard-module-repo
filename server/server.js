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
const http = require("http"),
      url  = require("url"),
      log = require("../self_modules/logger/logger").log;

/***
 * Constants.
 *
 * @since < 10.16.16
 */
const PORT = 8888;

/**
 * Starts a server by the given route function and collection of request handlers.
 *
 * @param route router function to parse the url
 * @param handle object with request handlers
 * @since < 10.16.16
 */
function start(route, handle) {
	http.createServer((request, response) => {
		let postData = "";
		request.setEncoding("utf8");
		
		const method = request.method,
	      	parsed = url.parse(request.url),
	      	pathname = parsed.pathname,
	      	params = parsed.query;
		
		request.addListener("data", function(postDataChunk) {
			postData += postDataChunk;
			log("Received POST data chunk '" + postDataChunk + "'.");
		});
		
		request.addListener("end", function() {
			route(handle, method, pathname, response, params, postData);
		});
	}).listen(PORT);
	
	log("Server has started on the port " + PORT + ".");
}

/***
 * Exports.
 *
 * @since < 10.16.16
 */
exports = module.exports = {
	start : start,
         PORT  : PORT //$test$
};