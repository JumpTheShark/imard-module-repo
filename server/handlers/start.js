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
const constants = require("../constants");

/***
 * Constants.
 *
 * @since < 10.16.16
 */
const
	CONTENT_TYPE_TEXT_HTML = constants.CONTENT_TYPE_TEXT_HTML,
	STATUS_CODE_OK         = constants.STATUS_CODE_OK,
	BODY                   =
		"<html>" +
		"<head>" +
		"<meta http-equiv='Content-Type' content='text/html;charset=UTF-8' />" +
		"</head>" +
		"<body>" +
		"<form action='/clone-redirect' method='post'>" +
		"<textarea name='link' rows='20' cols='60'>" +
		"</textarea>" +
		"<input type='submit' value='Clone repo' />" +
		"</form>" +
		"</body>" +
		"</html>";

/**
 * The request itself. Loads starting page.
 * Also contains a text field and a button to submit the link, calling the clone-redirect request.
 *
 * @param {function(object)} inject response inject function to put request reply in
 * @return {null} nothing
 * @since < 10.16.16
 */
const start = (inject) => {
	inject(STATUS_CODE_OK, CONTENT_TYPE_TEXT_HTML, BODY);
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