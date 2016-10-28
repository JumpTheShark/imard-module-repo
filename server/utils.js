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
	exec      = require("child_process").exec;

/***
 * Constants.
 *
 * @since 25.10.16
 */
const
	COMMAND_RM_RF  = constants.COMMAND_RM_RF,
	COMMAND_COPY   = constants.COMMAND_COPY,
	COMMAND_FIND   = constants.COMMAND_FIND,
	CLONED_FOLDER  = constants.CLONED_REPO_FOLDER_NAME,
	BUILT_FOLDER   = constants.BUILT_REPO_FOLDER_NAME,
	COPY_FROM_PATH = "./.built-repo/module/",
	COPY_TO_PATH   = "./modules/",
	FILE_PATTERN   = "module-[0-9]*",
	FILTER_PATTERN = " | xargs -n 1 basename";

/**
 * Removes folder (if exists) which contains the cloned repository
 *
 * @return {bool} whether the folder was removed
 * @since 25.10.16
 */
const removeClonedRepo = () =>
	new Promise((resolve, reject) => {
		exec(`${COMMAND_RM_RF} ${CLONED_FOLDER}`, (_, out, err) => {
			if (err !== null && err !== "")
				reject();

			resolve();
		});
	});

/**
 * Removes folder (if exists) which contains the built repository
 *
 * @return {bool} whether the folder was removed
 * @since 25.10.16
 */
const removeBuiltRepo = () =>
	new Promise((resolve, reject) => {
		exec(`${COMMAND_RM_RF} ${BUILT_FOLDER}`, (_, out, err) => {
			if (err !== null && err !== "")
				reject();

			resolve();
		});
	});

/**
 * Removes both folders (if exist) with cloned and built repository
 *
 * @return {bool} whether at least one of two folders was removed
 * @since 25.10.16
 */
const removeClonedAndBuiltRepo = () =>
	new Promise((resolve, reject) => {
		removeClonedRepo(
			() => {
				removeBuiltRepo(
					() => {
						resolve();
					},
					() => {
						resolve();
					}
				);
			},
			() => {
				removeBuiltRepo(
					() => {
						resolve();
					},
					() => {
						reject();
					}
				);
			});
	});

/**
 * Picks and copies the module data from the folder with built module to the constantly defined folder
 *
 * @return {bool} whether the module data was copied
 * @since 26.10.16
 */
const pickModuleData = () =>
	new Promise((resolve, reject) => {
		exec(`${COMMAND_FIND} ${COPY_FROM_PATH}${FILE_PATTERN}${FILTER_PATTERN}`, (_, out, err) => {
			if (err !== null && err !== "")
				reject();

			const moduleName = out.substr(0, out.length - 1);

			exec(`${COMMAND_COPY} ${COPY_FROM_PATH}${moduleName} ${COPY_TO_PATH}${moduleName}`, (__, out2, err2) => {
				if (err2 !== null && err2 !== "")
					reject();

				resolve();
			});
		});
	});

/***
 * Exports.
 *
 * @since 25.10.16
 */
exports = module.exports = {
	removeClonedRepo         : removeClonedRepo,
	removeBuiltRepo          : removeBuiltRepo,
	removeClonedAndBuiltRepo : removeClonedAndBuiltRepo,
	pickModuleData           : pickModuleData
};