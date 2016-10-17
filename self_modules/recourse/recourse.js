/****************************
 * An instrument for managing exports (in general code lines) that used for unit testing only.
 * Toggles test exports between test and production, commenting tes exports in the last case.
 *
 * @author GlaDos
 * @since < 10.16.16
 ****************************/

"use strict";

/* eslint-disable no-console */

/***
 * Imports.
 *
 * @since < 10.16.16
 */
const
	fs         = require("fs"),
	readDirRec = require("recursive-readdir");

/***
 * Constants.
 *
 * @since < 10.16.16
 */
const
	MARKER           = "/*$test$*/",
	MARKER_COMMENTED = "//test ",
	ENCODING         = "utf8",
	NEWLINE_REGEXP   = "\n",
	JS_EXTENSION    = ".js";

/**
 * Calls the given function for all found .js files recursively from the given folder.
 *
 * @param {string} root the folder to start searching for
 * @param {function(string, string)} func function (filePath, content) to do with files
 * @return {null} nothing
 * @since < 10.16.16
 */
const doWithContent = (root, func) => {
	doWithFiles(root, (filePaths) => {
		for (let i = 0; i < filePaths.length; i++) {
			const filePath = filePaths[i];

			fs.readFile(filePath, ENCODING, (error, content) => {
				if (error !== null)
					console.log("error while reading \"" + filePath + "\": " + error);
				else
					func(filePath, content);
			});
		}
	});
};

/**
 * Call the given function with all found .js files recursively from the given folder as an argument.
 *
 * @param {string} root the folder to start searching for
 * @param {function(string[])} func function (filePaths) to do with file list
 * @return {null} nothing
 * @since < 10.16.16
 */
const doWithFiles = (root, func) => {
	readDirRec(root, (error, filePaths) => {
		if (error !== null) {
			console.log("error: " + error);
			return;
		}

		const filePathsOut = filePaths.filter((path, _, __) =>
			path.indexOf(JS_EXTENSION, path.length - JS_EXTENSION.length) !== -1
		);

		func(filePathsOut);
	});
};

//************************************** IDEOLOGICAL CODE PART <start>

/**
 * Uncomment all test lines (with appropriate marker) in the given content to the given file.
 *
 * @param {string} filePath path of the file to be written changes
 * @param {string} content file content to modify
 * @return {null} nothing
 * @since < 10.16.16
 */
const fileToggleTest = (filePath, content) => {
	const lines = content.split(NEWLINE_REGEXP);
	let atLeastOneChange = false;

	for (let i = 0; i < lines.length; i++) {
		const line = lines[i];

		if (line.indexOf(MARKER) !== -1) {
			const index = line.indexOf(MARKER_COMMENTED);

			if (index !== -1) {
				atLeastOneChange = true;
				lines[i] =
						line.substring(0, index) +
						" " +
						line.substring(index + MARKER_COMMENTED.length);
			}
		}
	}

	if (atLeastOneChange)
		fs.writeFile(filePath, lines.join("\n"), (error) => {
			if (error)
				throw error;

			console.log("File \"" + filePath + "\" has been successfully toggled on testing");
		});
};

/**
 * Comment all test lines (with appropriate marker) in the given content to the given file.
 *
 * @param {string} filePath path of the file to be written changes
 * @param {string} content file content to modify
 * @return {null} nothing
 * @since < 10.16.16
 */
const fileToggleProduction = (filePath, content) => {
	const lines = content.split(NEWLINE_REGEXP);
	let atLeastOneChange = false;

	for (let i = 0; i < lines.length; i++) {
		const line = lines[i];

		if (line.indexOf(MARKER) !== -1 && line.indexOf(MARKER_COMMENTED) === -1) {
			atLeastOneChange = true;
			lines[i] = MARKER_COMMENTED + lines[i];
		}
	}

	if (atLeastOneChange)
		fs.writeFile(filePath, lines.join("\n"), (error) => {
			if (error)
				throw error;

			console.log("File \"" + filePath + "\" has been successfully toggled on production");
		});
};

//************************************** IDEOLOGICAL CODE PART <end>

/**
 * Uncomment all test lines (with appropriate marker) in all .js files found recursively from the given folder.
 *
 * @param {string} root folder to start searching for
 * @return {null} nothing
 * @since < 10.16.16
 */
const toggleTest = (root) => {
	doWithContent(root, fileToggleTest);
};

/**
 * Comment all test lines (with appropriate marker) in all .js files found recursively from the given folder.
 *
 * @param {string} root folder to start searching for
 * @return {null} nothing
 * @since < 10.16.16
 */
const toggleProduction = (root) => {
	doWithContent(root, fileToggleProduction);
};

/***
 * Exports.
 *
 * @since < 10.16.16
 */
exports = module.exports = {
	toggleTest: toggleTest,
	toggleProduction: toggleProduction
};