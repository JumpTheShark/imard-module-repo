"use strict";

const querystring = require("querystring"),
      git         = require("nodegit"),
      request     = require("request"),
      log         = require("../../self_modules/logger/logger").log;

const REDIRECT_URL            = "http://localhost:8888/compile",
      REDIRECT_TIMEOUT        = 10000,
      REPO_NAME               = "test_repo",
      REPO_CLONED_STR         = "Repository has been cloned.",
      POST_STR                = "POST",
      STATUSCODE_OK           = require("./requestHandlers").STATUSCODE_OK,
      STATUSCODE_BAD          = require("./requestHandlers").STATUSCODE_BAD,
      CONTENT_TYPE_TEXT_PLAIN = require("./requestHandlers").CONTENT_TYPE_TEXT_PLAIN;

function clone(response, params) {
	let link = querystring.parse(params).link,
	    isEligible = false,
	    outString = "";
	
	git.Clone(link, REPO_NAME).then(
		repository => {
			log(REPO_CLONED_STR);
			outString += "cloned: true\n";
			
			request({
				uri     : REDIRECT_URL,
	   			method  : POST_STR,
				body    : "", // TODO pass code for compiling
				timeout : REDIRECT_TIMEOUT
			}, function(err, resp, body) {
				if (err == null && resp != null && resp.statusCode == STATUSCODE_OK) {
					response.writeHead(STATUSCODE_OK, CONTENT_TYPE_TEXT_PLAIN);
					outString += "compiled: true\n";
					
				}
				else {
					response.writeHead(STATUSCODE_BAD, CONTENT_TYPE_TEXT_PLAIN);
					outString += "compiled: false" + (body == null ? "\n" : " (" + body + ")\n");
				}
				
				response.end(outString);
			});
		},
		
		error => {
			log("Repository has not been cloned. " + error + ".");
			
			response.writeHead(STATUSCODE_BAD, CONTENT_TYPE_TEXT_PLAIN);
			
			outString += "cloned: false (" + error + ")\n";
			response.end(outString);
		}
	);
}

exports = module.exports = {
	clone : clone
}