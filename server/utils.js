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
	config      = require("./GlobalConfiguraition").config,
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
	COMMAND_RM_R   = constants.COMMAND_RM_R,
	COMMAND_COPY   = constants.COMMAND_COPY,
	COMMAND_LS     = constants.COMMAND_LS,
	COMMAND_CAT    = constants.COMMAND_CAT,
	CLONED_FOLDER  = constants.CLONED_REPO_FOLDER_NAME,
	BUILT_FOLDER   = constants.BUILT_REPO_FOLDER_NAME,
	COPY_FROM_PATH = "./.built-repo/module/",
	COPY_TO_PATH   = "./modules/",
	FILE_PATTERN   = "module-[0-9]*",
	FILTER_PATTERN = " | xargs -n 1 basename",
	MONGO_DB       = "mongodb://localhost:27017/imard-module-db",
	MODULE_JSON    = "module.json",
	HTML_HEADER    = ".html",
	DB_COLLECTION  = "modules",
	DB_MODULE_KEY  = "data",
	DB_CONNECTED   = "Connected correctly to data base",
	DB_EXITED      = "Exited from data base";

/**
 * Removes folder (if exists) which contains the cloned repository.
 *
 * @return {Promise} whether the folder was removed [ resolve(), reject(string) ]
 * @since 25.10.16
 */
const removeClonedRepo = () =>
	new Promise((resolve, reject) => {
		exec(`${COMMAND_RM_R} ${CLONED_FOLDER}`, (_, out, err) => {
			if (err)
				reject(err);

			resolve();
		});
	});

/**
 * Removes folder (if exists) which contains the built repository.
 *
 * @return {Promise} whether the folder was removed [ resolve(), reject(string) ]
 * @since 25.10.16
 */
const removeBuiltRepo = () =>
	new Promise((resolve, reject) => {
		exec(`${COMMAND_RM_R} ${BUILT_FOLDER}`, (_, out, err) => {
			if (err)
				reject(err);

			resolve();
		});
	});

/**
 * Removes both folders (if exist) with cloned and built repository.
 *
 * @return {Promise} whether at least one of two folders was removed [ resolve(), reject(string) ]
 * @since 25.10.16
 */
const removeClonedAndBuiltRepo = () =>
	new Promise((resolve, reject) => {
		removeClonedRepo().then(
			() => {
				removeBuiltRepo().then(
					() => {
						resolve();
					},
					() => {
						resolve();
					}
				);
			},
			(err1) => {
				removeBuiltRepo().then(
					() => {
						resolve();
					},
					(err2) => {
						reject(`${err1} | ${err2}`);
					}
				);
			});
	});

/**
 * Returns the cloned module's file name.
 *
 * @return {Promise} module file name [ resolve(string), reject(string) ]
 * @since 26.10.16
 */
const clonedModuleName = () =>
	new Promise((resolve, reject) => {
		exec(`${COMMAND_LS} ${COPY_FROM_PATH}${FILE_PATTERN}${FILTER_PATTERN}`, (_, out, err) => {
			if (err)
				reject(err);

			resolve(out.substr(0, out.length - HTML_HEADER.length - 1));
		});
	});

/**
 * Picks and copies the module data from the folder with built module to the constantly defined folder.
 *
 * @return {Promise} whether the module data was copied [ resolve(), reject(string) ]
 * @since 26.10.16
 */
const pickModuleData = () =>
	new Promise((resolve, reject) => {
		clonedModuleName().then(
			(moduleName) => {
				const module = moduleName + HTML_HEADER;

				exec(`${COMMAND_COPY} ${COPY_FROM_PATH}${module} ${COPY_TO_PATH}${module}`, (__, out2, err2) => {
					if (err2)
						reject(err2);

					resolve();
				});
			},
			reject);
	});

/**
 * Picks and returns module JSON data from the folder with cloned module.
 *
 * @return {Promise} module JSON data [ resolve(string), reject(string) ]
 * @since 03.11.16
 */
const pickModuleJSON = () =>
	new Promise((resolve, reject) => {
		exec(`${COMMAND_CAT} ${config.getClonedRepoPath()}/${MODULE_JSON}`, (_, out, err) => {
			if (err)
				reject(err);

			resolve(JSON.parse(out));
		});
	});

/**
 * Inserts saved module info into the database.
 *
 * @param {string} value record value to put with the key
 * @return {bool} whether the module info was inserted into the data base
 * @since 28.10.16
 */
const addModuleToDB = (value) =>
	new Promise((resolve, reject) => {
		co(function *() {
			const db = yield MongoClient.connect(MONGO_DB);

			log(DB_CONNECTED);

			const record = {};

			record[DB_MODULE_KEY] = value;

			const document = yield db.collection(DB_COLLECTION).insertOne(record);

			assert.equal(1, document.insertedCount);

			log(DB_EXITED);

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
	pickModuleJSON           : pickModuleJSON,
	addModuleToDB            : addModuleToDB
};