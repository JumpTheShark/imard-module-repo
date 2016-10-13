const querystring = require("querystring"),
      request     = require("request");

const REDIRECT_URL     = "http://localhost:8888/clone",
      REDIRECT_TIMEOUT = 10000;

function cloneRedirect(response, postData) {
	request({
		uri     : REDIRECT_URL,
		qs      : { link : querystring.parse(postData).text },
		method  : "PUT",
		timeout : REDIRECT_TIMEOUT
	}, function(err, resp, body) {
		if (resp != null) {		
			response.writeHead(resp.statusCode, resp.headers);
			response.end(resp.body);
		}
		else {
			response.writeHead(400, {"Content-Type" : "text/plain"});
			response.end(err + "");
		}
	});
}

exports = module.exports = {
	cloneRedirect: cloneRedirect
}