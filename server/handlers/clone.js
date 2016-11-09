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
	git              = require("nodegit"),
	log              = require("../../self_modules/logger/logger").log,
	constants        = require("../constants"),
	removeClonedRepo = require("../utils").removeClonedRepo;

/***
 * Constants.
 *
 * @since < 10.16.16
 */
const
	REPO_NAME       = constants.CLONED_REPO_FOLDER_NAME,
	REPO_CLONED_STR = "Repository has been cloned.",
	NO_LINK_STR     = "no link given to clone",
	STATUS_CODE_OK  = constants.STATUS_CODE_OK,
	TEXT_PLAIN      = constants.TEXT_PLAIN;

/**
 * The request itself. Clones repository by the given link.
 *
 * @param {function(object)} inject response inject function to put request reply in
 * @param {string} params request specification. Must contain 'link'
 * @return {null} nothing
 * @since < 10.16.16
 */
const clone = (inject, params) => {
	const link = params.link;

	if (!link) {
		inject(NO_LINK_STR);
		return;
	}

	/* eslint-disable new-cap */

	const cloneReq = () => {
		git.Clone(link, REPO_NAME).then(
			(_) => {
				log(REPO_CLONED_STR);
				inject(STATUS_CODE_OK, TEXT_PLAIN, "cloned: true");
			},

			(error) => {
				log(`Repository has not been cloned. ${error}.`);
				inject(`cloned: false (${error})`);
			}
		);
	};

	/* eslint-enable new-cap */

	removeClonedRepo().then(cloneReq, cloneReq);
};

/**
 * Exports.
 *
 * @since < 10.16.16
 */
exports = module.exports = { clone: clone };