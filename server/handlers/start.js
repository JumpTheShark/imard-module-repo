"use strict";

const requestHandlers = require("./requestHandlers");

const CONTENT_TYPE_TEXT_PLAIN = requestHandlers.CONTENT_TYPE_TEXT_PLAIN,
      STATUS_CODE_OK          = requestHandlers.STATUS_CODE_OK,
      BODY                    = '<html><head><meta http-equiv="Content-Type" content="text/html;charset=UTF-8" /></head><body><form action="/clone-redirect" method="post"><textarea name="text" rows="20" cols="60"></textarea><input type="submit" value="Clone repo" /></form></body></html>';

function start(response) { // TODO remove the plug
	console.log("AAAAAA: " + require("./requestHandlers").STATUS_CODE_OK + " | " + requestHandlers.STATUS_CODE_OK + " | " + STATUS_CODE_OK);
	response.writeHead(STATUS_CODE_OK, CONTENT_TYPE_TEXT_PLAIN);
	response.end(BODY);
}

exports = module.exports = {
	start : start,
	BODY  : BODY //$test$
}