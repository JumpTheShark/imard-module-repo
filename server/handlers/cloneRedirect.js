"use strict";

const querystring = require("querystring"),
      request     = require("request");

const REDIRECT_URL            = "http://localhost:8888/clone",
      REDIRECT_TIMEOUT        = 10000,
      CONTENT_TYPE_TEXT_PLAIN = require("./requestHandlers").CONTENT_TYPE_TEXT_PLAIN,
      STATUS_CODE_BAD         = require("./requestHandlers").STATUS_CODE_BAD,
      PUT_STR                 = "PUT";

function cloneRedirect(response, postData) {
	request({
		uri     : REDIRECT_URL,
		qs      : { link : querystring.parse(postData).text },
		method  : PUT_STR,
		timeout : REDIRECT_TIMEOUT
	}, function(err, resp, body) {
		if (resp != null) {		
			response.writeHead(resp.statusCode, resp.headers);
			response.end(resp.body);
		}
		else {
			response.writeHead(STATUS_CODE_BAD, CONTENT_TYPE_TEXT_PLAIN);
			response.end(err + "");
		}
	});
}

exports = module.exports = {
	cloneRedirect: cloneRedirect
}