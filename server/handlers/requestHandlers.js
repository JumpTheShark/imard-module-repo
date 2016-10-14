"use strict";

const CONTENT_TYPE_TEXT_PLAIN = { "Content-Type" : "text/plain" },
      STATUSCODE_OK           = 200,
      STATUSCODE_BAD          = 400;

exports = module.exports = {
	CONTENT_TYPE_TEXT_PLAIN : CONTENT_TYPE_TEXT_PLAIN,
	STATUSCODE_OK           : STATUSCODE_OK,
	STATUSCODE_BAD          : STATUSCODE_BAD,
	start                   : require("./start").start,
	cloneRedirect           : require("./cloneRedirect").cloneRedirect,
	clone                   : require("./clone").clone,
	compile                 : require("./compile").compile
};