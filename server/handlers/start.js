"use strict";

const requestHandlers = require("./requestHandlers");

const CONTENT_TYPE_TEXT_PLAIN = requestHandlers.CONTENT_TYPE_TEXT_PLAIN,
      STATUSCODE_OK           = requestHandlers.STATUSCODE_OK,
      BODY                    = '<html><head><meta http-equiv="Content-Type" content="text/html;charset=UTF-8" /></head><body><form action="/clone-redirect" method="post"><textarea name="text" rows="20" cols="60"></textarea><input type="submit" value="Clone repo" /></form></body></html>';

function start(response) {
	console.log("AAAAAA: " + require("./requestHandlers").STATUSCODE_OK + " | " + requestHandlers.STATUSCODE_OK + " | " + STATUSCODE_OK);
	response.writeHead(STATUSCODE_OK, CONTENT_TYPE_TEXT_PLAIN);
	response.end(BODY);
}

exports = module.exports = {
	start : start,
 	CONTENT_TYPE_TEXT_PLAIN : CONTENT_TYPE_TEXT_PLAIN, //$test$
 	STATUSCODE_OK           : STATUSCODE_OK //$test$
}