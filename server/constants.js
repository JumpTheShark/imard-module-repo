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
	CONTENT_TYPE                 = "Content-Type",
	TEXT_PLAIN                   = "text/plain",
	TEXT_HTML                    = "text/html",
	CONTENT_TYPE_TEXT_PLAIN      = {},
	CONTENT_TYPE_TEXT_HTML       = {},
	STATUS_CODE_OK               = 200,
	STATUS_CODE_BAD              = 400,
	STATUS_CODE_NOT_FOUND        = 404,
	PORT                         = 8888,
	TEST_PORT                    = 8889,
	REDIRECT_TIMEOUT             = 100000,
	CLONED_REPO_FOLDER_NAME      = ".cloned-repo",
	TEST_CLONED_REPO_FOLDER_NAME = ".test-cloned-repo",
	BUILT_REPO_FOLDER_NAME       = ".built-repo",
	TEST_REPO_ADDRESS            = "https://github.com/JumpTheShark/imard-exemplary-module",
	MODULE_FOLDER                = "modules",
	COMMAND_BUILD                = "./imard-build",
	COMMAND_RM_R                 = "rm -r",
	COMMAND_MKDIR                = "mkdir",
	COMMAND_COPY                 = "cp",
	COMMAND_LS                   = "ls",
	COMMAND_FIND                 = "find",
	COMMAND_CAT                  = "cat";

CONTENT_TYPE_TEXT_PLAIN[CONTENT_TYPE] = TEXT_PLAIN;
CONTENT_TYPE_TEXT_HTML[CONTENT_TYPE]  = TEXT_HTML;

/***
 * Exports.
 *
 * @since 20.16.16
 */
exports = module.exports = {
	CONTENT_TYPE                 : CONTENT_TYPE,
	TEXT_PLAIN                   : TEXT_PLAIN,
	TEXT_HTML                    : TEXT_HTML,
	CONTENT_TYPE_TEXT_PLAIN      : CONTENT_TYPE_TEXT_PLAIN,
	CONTENT_TYPE_TEXT_HTML       : CONTENT_TYPE_TEXT_HTML,
	STATUS_CODE_OK               : STATUS_CODE_OK,
	STATUS_CODE_BAD              : STATUS_CODE_BAD,
	STATUS_CODE_NOT_FOUND        : STATUS_CODE_NOT_FOUND,
	PORT                         : PORT,
	TEST_PORT                    : TEST_PORT,
	REDIRECT_TIMEOUT             : REDIRECT_TIMEOUT,
	CLONED_REPO_FOLDER_NAME      : CLONED_REPO_FOLDER_NAME,
	TEST_CLONED_REPO_FOLDER_NAME : TEST_CLONED_REPO_FOLDER_NAME,
	BUILT_REPO_FOLDER_NAME       : BUILT_REPO_FOLDER_NAME,
	TEST_REPO_ADDRESS            : TEST_REPO_ADDRESS,
	MODULE_FOLDER                : MODULE_FOLDER,
	COMMAND_BUILD                : COMMAND_BUILD,
	COMMAND_RM_R                 : COMMAND_RM_R,
	COMMAND_MKDIR                : COMMAND_MKDIR,
	COMMAND_COPY                 : COMMAND_COPY,
	COMMAND_LS                   : COMMAND_LS,
	COMMAND_FIND                 : COMMAND_FIND,
	COMMAND_CAT                  : COMMAND_CAT
};