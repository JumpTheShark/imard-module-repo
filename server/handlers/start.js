/****************************
 * Request 'start' [GET]. For now this is a plug request for entering the repository link.
 *
 * @author GlaDos
 * @since < 10.16.16
 ****************************/

"use strict";

/***
 * Imports.
 *
 * @since < 10.16.16
 */
const requestHandlers = require("./requestHandlers");

/***
 * Constants.
 *
 * @since < 10.16.16
 */
const
	CONTENT_TYPE_TEXT_PLAIN = requestHandlers.CONTENT_TYPE_TEXT_PLAIN,
	STATUS_CODE_OK          = requestHandlers.STATUS_CODE_OK,
	BODY                    =
		"<html>" +
		"<head>" +
		"<meta http-equiv='Content-Type' content='text/html;charset=UTF-8' />" +
		"</head>" +
		"<body>" +
		"<form action=''/clone-redirect' method='post'>" +
		"<textarea name='text' rows='20' cols='60'>" +
		"</textarea>" +
		"<input type='submit' value='Clone repo' />" +
		"</form>" +
		"</body>" +
		"</html>";

/**
 * The request itself. Loads starting page.
 * Also contains a text field and a button to submit the link, calling the clone-redirect request.
 *
 * @param {object} response variable to write the reply to
 * @return {null} nothing
 * @since < 10.16.16
 */
const start = (response) => {
	// TODO remove the plug
	/* eslint-disable no-console */
	console.log("DEBUG: " + require("./requestHandlers").STATUS_CODE_OK + " | " + requestHandlers.STATUS_CODE_OK + " | " + STATUS_CODE_OK);
	response.writeHead(STATUS_CODE_OK, CONTENT_TYPE_TEXT_PLAIN);
	response.end(BODY);
};

/**
 * Exports.
 *
 * @since < 10.16.16
 */
exports = module.exports = {
	start : start,
	BODY  : BODY /*$test$*/
};