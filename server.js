const http = require("http");
const url  = require("url");
const exec = require("child_process").exec;

function start(route, handle) {
	function onRequest(request, response) {
		"use strict";
		
		let postData = "";
		const pathname = url.parse(request.url).pathname;
		
		console.log("Request for " + pathname + " received.");
		request.setEncoding("utf8");
		
		request.addListener("data", function(postDataChunk) {
			postData += postDataChunk;
			console.log("Received POST data chunk '" + postDataChunk + "'.");
		});
		
		request.addListener("end", function() {
			route(handle, pathname, response, postData);
		});
	};
	
	http.createServer(onRequest).listen(8888);
	console.log("Server has started.");
}

module.exports.start = start;