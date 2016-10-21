/****************************
 * Global constants
 *
 * @author GlaDos
 * @since 20.10.16
 ****************************/

"use strict";

/***
 * Constants.
 *
 * @since 20.16.16
 */
const
	CONTENT_TYPE            = "Content-Type",
	TEXT_PLAIN              = "text/plain",
	TEXT_HTML               = "text/html",
	CONTENT_TYPE_TEXT_PLAIN = {},
	CONTENT_TYPE_TEXT_HTML  = {},
	STATUS_CODE_OK          = 200,
	STATUS_CODE_BAD         = 400,
	STATUS_CODE_NOT_FOUND   = 404,
	TEST_PORT               = 8889;

CONTENT_TYPE_TEXT_PLAIN[CONTENT_TYPE] = TEXT_PLAIN;
CONTENT_TYPE_TEXT_HTML[CONTENT_TYPE]  = TEXT_HTML;

/***
 * Exports.
 *
 * @since 20.16.16
 */
exports = module.exports = {
	CONTENT_TYPE            : CONTENT_TYPE,
	TEXT_PLAIN              : TEXT_PLAIN,
	TEXT_HTML               : TEXT_HTML,
	CONTENT_TYPE_TEXT_PLAIN : CONTENT_TYPE_TEXT_PLAIN,
	CONTENT_TYPE_TEXT_HTML  : CONTENT_TYPE_TEXT_HTML,
	STATUS_CODE_OK          : STATUS_CODE_OK,
	STATUS_CODE_BAD         : STATUS_CODE_BAD,
	STATUS_CODE_NOT_FOUND   : STATUS_CODE_NOT_FOUND,
	TEST_PORT               : TEST_PORT
};