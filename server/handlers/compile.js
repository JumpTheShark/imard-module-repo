/****************************
 * Request 'compile' [POST]. Builds the given code.
 *
 * @author GlaDos
 * @since < 10.16.16
 ****************************/

"use strict";

const exec = require("child_process").exec;

const NOT_SUPPORTED_STR       = "not supported yet.",
      CONTENT_TYPE_TEXT_PLAIN = require("./requestHandlers").CONTENT_TYPE_TEXT_PLAIN,
      STATUS_CODE_BAD         = require("./requestHandlers").STATUS_CODE_BAD;

function compile(response, postData) { // TODO complete the request
	response.writeHead(STATUS_CODE_BAD, CONTENT_TYPE_TEXT_PLAIN);
	response.end(NOT_SUPPORTED_STR);
}

exports = module.exports = {
	compile : compile
};