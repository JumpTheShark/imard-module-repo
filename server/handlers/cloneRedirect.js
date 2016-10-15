"use strict";

const querystring     = require("querystring"),
      request         = require("request"),
	  requestHandlers = require("./requestHandlers");

const REDIRECT_URL            = "http://localhost:8888/clone",
      REDIRECT_TIMEOUT        = 10000,
      CONTENT_TYPE_TEXT_PLAIN = requestHandlers.CONTENT_TYPE_TEXT_PLAIN,
      STATUS_CODE_BAD         = requestHandlers.STATUS_CODE_BAD,
      PUT_STR                 = "PUT",
	  NO_LINK_STR             = "no link given to clone";

function cloneRedirect(response, postData) {
	function error(err, resp, _) {
		if (resp != null) {
			response.writeHead(resp.statusCode, resp.headers);
			response.end(resp.body);
		}
		else {
			response.writeHead(STATUS_CODE_BAD, CONTENT_TYPE_TEXT_PLAIN);
			response.end(err + "");
		}
	}

	if (postData == null)
		error(NO_LINK_STR, null, null);
	else
		request({
			uri     : REDIRECT_URL,
			qs      : { link : querystring.parse(postData).text },
			method  : PUT_STR,
			timeout : REDIRECT_TIMEOUT
		}, error);
}

exports = module.exports = {
	cloneRedirect : cloneRedirect
};