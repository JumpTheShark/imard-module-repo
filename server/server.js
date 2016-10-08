const http = require("http");
const url  = require("url");
const exec = require("child_process").exec;

function start(route, handle) {
	function onRequest(request, response) {
		"use strict";
		
		let postData = "";
		
		const method = request.method;
		const parsed = url.parse(request.url);
		const pathname = parsed.pathname;
		const params = parsed.query;
		
		request.setEncoding("utf8");
		
		request.addListener("data", function(postDataChunk) {
			postData += postDataChunk;
			console.log("Received POST data chunk '" + postDataChunk + "'.");
		});
		
		request.addListener("end", function() {
			route(handle, method, pathname, response, params, postData);
		});
	};
	
	http.createServer(onRequest).listen(8888);
	console.log("Server has started.");
}

exports = module.exports = {
	start : start
};