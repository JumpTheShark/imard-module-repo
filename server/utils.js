/****************************
 * Collection of utility methods
 *
 * @author GlaDos
 * @since 25.10.16
 ****************************/

"use strict";

/***
 * Imports.
 *
 * @since 25.10.16
 */
const
	constants = require("./constants"),
	execSync  = require("child_process").execSync;

/***
 * Constants.
 *
 * @since 25.10.16
 */
const
	COMMAND_RM_RF = constants.COMMAND_RM_RF,
	CLONED_FOLDER = constants.CLONED_REPO_FOLDER_NAME,
	BUILT_FOLDER  = constants.BUILT_REPO_FOLDER_NAME;

/**
 * Removes folder (if exists) which contains the cloned repository
 *
 * @return {bool} whether the folder was removed
 * @since 25.10.16
 */
const removeClonedRepo = () => {
	let res = false;

	execSync(`${COMMAND_RM_RF} ${CLONED_FOLDER}`, (_, out, err) => {
		console.log("ANDDDDDDD??!!");
		res = err === null || err === "";
	});
	console.log("LASTTTTT!!");
	return res;
};

/**
 * Removes folder (if exists) which contains the built repository
 *
 * @return {bool} whether the folder was removed
 * @since 25.10.16
 */
const removeBuiltRepo = () => {
	let res = false;

	execSync(`${COMMAND_RM_RF} ${BUILT_FOLDER}`, (_, out, err) => {
		res = err === null || err === "";
	});

	return res;
};

/**
 * Removes both folders (if exist) with cloned and built repository
 *
 * @return {bool} whether at least one of two folders was removed
 * @since 25.10.16
 */
const removeClonedAndBuiltRepo = () => {
	const
		b1 = removeClonedRepo(),
		b2 = removeBuiltRepo();

	return b1 || b2;
};

/***
 * Exports.
 *
 * @since 25.10.16
 */
exports = module.exports = {
	removeClonedRepo         : removeClonedRepo,
	removeBuiltRepo          : removeBuiltRepo,
	removeClonedAndBuiltRepo : removeClonedAndBuiltRepo
};