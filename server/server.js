"use strict";

const http = require("http"),
      url  = require("url"),
      exec = require("child_process").exec;

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
			console.log("Received POST data chunk '" + postDataChunk + "'.");
		});
		
		request.addListener("end", function() {
			route(handle, method, pathname, response, params, postData);
		});
	}).listen(PORT);
	
	console.log("Server has started on the port " + PORT + ".");
}

exports = module.exports = {
	start : start,
//test|    	PORT  : PORT //$test$
};