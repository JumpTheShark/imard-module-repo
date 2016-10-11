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
		response.writeHead(resp.statusCode, resp.headers);
		response.end(resp.body);
	});
}

exports = module.exports = {
	cloneRedirect: cloneRedirect
}