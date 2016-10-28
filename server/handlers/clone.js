/****************************
 * Request 'clone' [PUT]. Clones the given repository.
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
const
	queryString      = require("querystring"),
	git              = require("nodegit"),
	request          = require("request"),
	log              = require("../../self_modules/logger/logger").log,
	constants        = require("../constants"),
	removeClonedRepo = require("../utils").removeClonedRepo;

/***
 * Constants.
 *
 * @since < 10.16.16
 */
const
	COMPILE_URL             = `http://localhost:${constants.PORT}/compile`,
	REDIRECT_TIMEOUT        = constants.REDIRECT_TIMEOUT,
	REPO_NAME               = constants.CLONED_REPO_FOLDER_NAME,
	REPO_CLONED_STR         = "Repository has been cloned.",
	NO_LINK_STR             = "no link given to clone",
	POST_STR                = "POST",
	STATUS_CODE_OK          = constants.STATUS_CODE_OK,
	STATUS_CODE_BAD         = constants.STATUS_CODE_BAD,
	CONTENT_TYPE_TEXT_PLAIN = constants.CONTENT_TYPE_TEXT_PLAIN;

/**
 * The request itself. Clones repository by the given link.
 *
 * @param {function(object)} inject response inject function to put request reply in
 * @param {string} params request specification. Must contain 'link'
 * @return {null} nothing
 * @since < 10.16.16
 */
const clone = (inject, params) => {
	let outString = "";

	const reply = (err, resp, body) => {
		removeClonedRepo();

		if (err === null && resp !== null && resp.statusCode === STATUS_CODE_OK)
			inject(
				STATUS_CODE_OK,
				CONTENT_TYPE_TEXT_PLAIN,
				outString + "compiled: true\n"
			);
		else
			inject(
				STATUS_CODE_BAD,
				CONTENT_TYPE_TEXT_PLAIN,
				outString + `compiled: false ${body === null || body === undefined ? `(${err})\n` : `(${body})\n`}`
			);
	};

	if (params === null) {
		reply(null, null, NO_LINK_STR);
		return;
	}

	const bufLink = queryString.parse(params).link;

	if (bufLink === undefined) {
		reply(null, null, NO_LINK_STR);
		return;
	}

	const link = queryString.parse(bufLink).text;

	if (link === undefined) {
		reply(null, null, NO_LINK_STR);
		return;
	}

	/* eslint-disable new-cap */

	git.Clone(link, REPO_NAME).then(
		(_) => {
			log(REPO_CLONED_STR);
			outString += "cloned: true\n";

			request({
				uri:     COMPILE_URL,
				method:  POST_STR,
				body:    REPO_NAME,
				timeout: REDIRECT_TIMEOUT
			}, reply);
		},

		(error) => {
			log(`Repository has not been cloned. ${error}.`);
			inject(STATUS_CODE_BAD, CONTENT_TYPE_TEXT_PLAIN, `${outString}cloned: false (${error})\n`);
		}
	);

	/* eslint-enable new-cap */
};

/**
 * Exports.
 *
 * @since < 10.16.16
 */
exports = module.exports = { clone: clone };