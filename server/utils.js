/****************************
 * Collection of utility methods.
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
	constants   = require("./constants"),
	exec        = require("child_process").exec,
	co          = require("co"),
	assert      = require("assert"),
	MongoClient = require("mongodb").MongoClient,
	log         = require("../self_modules/logger/logger").log;

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
 * Removes folder (if exists) which contains the cloned repository.
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
 * Removes folder (if exists) which contains the built repository.
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
 * Removes both folders (if exist) with cloned and built repository.
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
 * Returns the cloned module's file name.
 *
 * @return {string} module file name
 * @since 26.10.16
 */
const clonedModuleName = () =>
	new Promise((resolve, reject) => {
		exec(`${COMMAND_FIND} ${COPY_FROM_PATH}${FILE_PATTERN}${FILTER_PATTERN}`, (_, out, err) => {
			if (err !== null && err !== "")
				reject();

			resolve(out.substr(0, out.length - 1));
		});
	});

/**
 * Picks and copies the module data from the folder with built module to the constantly defined folder.
 *
 * @return {bool} whether the module data was copied
 * @since 26.10.16
 */
const pickModuleData = () =>
	new Promise((resolve, reject) => {
		clonedModuleName().then(
			(moduleName) => {
				exec(`${COMMAND_COPY} ${COPY_FROM_PATH}${moduleName} ${COPY_TO_PATH}${moduleName}`, (__, out2, err2) => {
					if (err2 !== null && err2 !== "")
						reject();

					resolve();
				});
			},
			reject);
	});

/**
 * Inserts saved module into the database.
 *
 * @param {string} name the name of the module file stored in modules' folder
 * @return {bool} whether the module was inserted into the data base
 * @since 28.10.16
 */
const addModuleToDB = (name) =>
	new Promise((resolve, reject) => {
		co(function *() {
			const db = yield MongoClient.connect("mongodb://localhost:27017/imard-module-db");

			log("Connected correctly to data base");

			const document = yield db.collection("modules").insertOne({ name : name });

			assert.equal(1, document.insertedCount);

			log("Exited from data base");

			db.close();
			resolve();
		}).catch((err) => {
			log(`Error while working with data base: ${err.stack}`);
			reject();
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
	clonedModuleName         : clonedModuleName,
	pickModuleData           : pickModuleData,
	addModuleToDB            : addModuleToDB
};