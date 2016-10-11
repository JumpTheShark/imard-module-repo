"use strict";

const querystring = require("querystring"),
      git         = require("nodegit"),
      request     = require("request");

const REDIRECT_URL     = "http://localhost:8888/compile",
      REDIRECT_TIMEOUT = 10000;

function clone(response, params) {
	let link = querystring.parse(params).link,
	    isEligible = false,
	    outString = "";
	
	git.Clone(link, "test_repo").then(
		repository => {
			console.log("Repository has been cloned.");
			outString += "cloned: true\n";
			
			request({
				uri     : REDIRECT_URL,
	   			method  : "POST",
				body    : "TOD0 pass code for compiling",
				timeout : REDIRECT_TIMEOUT
			}, function(err, resp, body) {
				if (err == null && resp != null && resp.statusCode == 200) {
					response.writeHead(200, { "Content-Type" : "text/plain" });
					outString += "compiled: true\n";
					
				}
				else {
					response.writeHead(400, { "Content-Type" : "text/plain" });
					outString += "compiled: false\n";
				}
				
				response.end(outString);
			});
		},
		
		error => {
			console.log("Repository has not been cloned. " + error + ".");
			
			response.writeHead(400, { "Content-Type" : "text/plain" });
			
			outString += "cloned: false\n";
			response.end(outString);
		}
	);
}

exports = module.exports = {
	clone : clone
}