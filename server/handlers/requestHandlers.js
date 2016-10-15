"use strict";

const requestStart         = require("./start").start,
	  requestCloneRedirect = require("./cloneRedirect").cloneRedirect,
	  requestClone         = require("./clone").clone,
	  requestCompile       = require("./compile").compile;

const CONTENT_TYPE_TEXT_PLAIN = { "Content-Type" : "text/plain" },
      STATUS_CODE_OK          = 200,
      STATUS_CODE_BAD         = 400;

exports = module.exports = {
	CONTENT_TYPE_TEXT_PLAIN : CONTENT_TYPE_TEXT_PLAIN,
	STATUS_CODE_OK          : STATUS_CODE_OK,
	STATUS_CODE_BAD         : STATUS_CODE_BAD,
	start                   : requestStart,
	cloneRedirect           : requestCloneRedirect,
	clone                   : requestClone,
	compile                 : requestCompile
};

console.log(exports.cloneRedirect);