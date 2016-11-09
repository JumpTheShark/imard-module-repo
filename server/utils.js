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
	constants     = require("./constants"),
	config        = require("./GlobalConfiguraition").config,
	exec          = require("child_process").exec,
	co            = require("co"),
	assert        = require("assert"),
	MongoClient   = require("mongodb").MongoClient,
	log           = require("../self_modules/logger/logger").log,
	InnerResponse = require("./InnerResponse");

/***
 * Constants.
 *
 * @since 25.10.16
 */
const
	COMMAND_RM_R    = constants.COMMAND_RM_R,
	COMMAND_COPY    = constants.COMMAND_COPY,
	COMMAND_LS      = constants.COMMAND_LS,
	COMMAND_CAT     = constants.COMMAND_CAT,
	CLONED_FOLDER   = constants.CLONED_REPO_FOLDER_NAME,
	BUILT_FOLDER    = constants.BUILT_REPO_FOLDER_NAME,
	STATUS_CODE_BAD = constants.STATUS_CODE_BAD,
	TEXT_PLAIN      = constants.TEXT_PLAIN,
	STRING          = "string",
	COPY_FROM_PATH  = "/module/",
	COPY_TO_PATH    = "./modules/",
	FILE_PATTERN    = "module-[0-9]*",
	FILTER_PATTERN  = " | xargs -n 1 basename",
	MONGO_DB        = "mongodb://localhost:27017/imard-module-db",
	MODULE_JSON     = "module.json",
	HTML_HEADER     = ".html",
	DB_COLLECTION   = "modules",
	DB_MODULE_KEY   = "data",
	DB_CONNECTED    = "Connected correctly to data base",
	DB_EXITED       = "Exited from data base";

/**
 * Removes folder (if exists) which contains the cloned repository.
 * The targeted folder is a 'production' folder, that is why no means which configuration mode enabled.
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
 * The targeted folder is a 'production' folder, that is why no means which configuration mode enabled.
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
 * The targeted folders are 'production' folders, that is why no means which configuration mode enabled.
 *
 * @return {Promise} whether at least one of two folders was removed [ resolve(), reject(string) ]
 * @since 25.10.16
 */
const removeClonedAndBuiltRepo = () =>
	new Promise((resolve, reject) => {
		removeClonedRepo().then(
			() => removeBuiltRepo().then(resolve, () => resolve()),
			(err1) => {
				removeBuiltRepo().then(
					resolve,
					(err2) => reject(`${err1} | ${err2}`)
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
		exec(`${COMMAND_LS} ${config.getBuiltRepoPath() + COPY_FROM_PATH}${FILE_PATTERN}${FILTER_PATTERN}`, (_, out, err) => {
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

				exec(`${COMMAND_COPY} ${config.getBuiltRepoPath() + COPY_FROM_PATH}${module} ${COPY_TO_PATH}${module}`, (__, out2, err2) => {
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

/**
 * Returns a promise that calls a request and resolves/rejects after getting the response.
 * Whether the response status code equals 400, reject branch is called, or resolve otherwise.
 *
 * @param {function} req request to call
 * @param {string} arg (optional) argument, interpreted as postData [POST] or params [PUT]
 * @return {Promise} promise, which calls a request and returns response in resolve/reject
 * @since 07.11.16
 */
const requestAsync = (req, arg) =>
	new Promise((resolve, reject) => {
		const injectPromise = (statusCode, contentType, body) => {
			if (typeof statusCode === STRING)
				reject(new InnerResponse(STATUS_CODE_BAD, TEXT_PLAIN, statusCode));
			else
			if (statusCode === STATUS_CODE_BAD)
				reject(new InnerResponse(statusCode, contentType, body));
			else
				resolve(new InnerResponse(statusCode, contentType, body));
		};

		req(injectPromise, arg);
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
	addModuleToDB            : addModuleToDB,
	requestAsync             : requestAsync
};