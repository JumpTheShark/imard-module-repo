/****************************
 * Server core. Creates and activates a request listener with all needed instruments.
 *
 * @author GlaDos
 * @since < 10.16.16
 ****************************/

"use strict";

const http = require("http"),
      url  = require("url"),
      log = require("../self_modules/logger/logger").log;

const PORT = 8888;

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

exports = module.exports = {
	start : start,
         PORT  : PORT //$test$
};