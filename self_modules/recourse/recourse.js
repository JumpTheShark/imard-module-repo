/****************************
 * An instrument for managing exports (in general code lines) that used for unit testing only.
 * Toggles test exports between test and production, commenting tes exports in the last case.
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
const fs         = require("fs"),
      readDirRec = require("recursive-readdir");

/***
 * Constants.
 *
 * @since < 10.16.16
 */
const MARKER           = "//$test$",
      MARKER_COMMENTED = "//test| ",
      ENCODING         = "utf8",
      NEWLINE_REGEXP   = "\n";

/**
 * Calls the given function for all found .js files recursively from the given folder.
 *
 * @param root the folder to start searching for
 * @param func function (filePath, content) to do with files
 * @since < 10.16.16
 */
function doWithContent(root, func) {
	doWithFiles(root, (filePaths) => {
		for (let i = 0; i < filePaths.length; i++) {
			const filePath = filePaths[i];
			
			fs.readFile(filePath, ENCODING, (error, content) => {
				if (error != null) {
					console.log("error while reading \"" + filePath + "\": " + error);
					return;
				}
				
				func(filePath, content);
			});
		}
	});
}

/**
 * Call the given function with all found .js files recursively from the given folder as an argument.
 *
 * @param root the folder to start searching for
 * @param func function (filePaths) to do with file list
 * @since < 10.16.16
 */
function doWithFiles(root, func) {
	readDirRec(root, (error, filePaths) => {
		if (error != null) {
			console.log("error: " + error);
			return;
		}
		
		filePaths = filePaths.filter((path, _, __) => {
			return path.indexOf(".js", path.length - 3) !== -1;
		});
		
		if (root.indexOf("/", root.length - 1) == -1)
			root += "/";
		
		func(filePaths);
	});
}

//************************************** IDEOLOGICAL CODE PART <start>

/**
 * Uncomment all test lines (with appropriate marker) in the given content to the given file.
 *
 * @param filePath path of the file to be written changes
 * @param content file content to modify
 * @since < 10.16.16
 */
function fileToggleTest(filePath, content) {
	let lines = content.split(NEWLINE_REGEXP),
	    atLeastOneChange = false;
	
	for (let i = 0; i < lines.length; i++) {
		const line = lines[i];
		
		if (line.indexOf(MARKER) !== -1) {
			const index = line.indexOf(MARKER_COMMENTED);
			
			if (index !== -1) {
				atLeastOneChange = true;
				lines[i] = line.substring(0, index) +
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
}

/**
 * Comment all test lines (with appropriate marker) in the given content to the given file.
 *
 * @param filePath path of the file to be written changes
 * @param content file content to modify
 * @since < 10.16.16
 */
function fileToggleProduction(filePath, content) {
	let lines = content.split(NEWLINE_REGEXP),
	    atLeastOneChange = false;
	
	for (let i = 0; i < lines.length; i++) {
		const line = lines[i];
		
		if (line.indexOf(MARKER) !== -1 && line.indexOf(MARKER_COMMENTED) == -1) {
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
}

//************************************** IDEOLOGICAL CODE PART <end>

/**
 * Uncomment all test lines (with appropriate marker) in all .js files found recursively from the given folder.
 *
 * @param root folder to start searching for
 * @since < 10.16.16
 */
function toggleTest(root) {
	doWithContent(root, fileToggleTest);
}

/**
 * Comment all test lines (with appropriate marker) in all .js files found recursively from the given folder.
 *
 * @param root folder to start searching for
 * @since < 10.16.16
 */
function toggleProduction(root) {
	doWithContent(root, fileToggleProduction);
}

/***
 * Exports.
 *
 * @since < 10.16.16
 */
exports = module.exports = {
	toggleTest: toggleTest,
	toggleProduction: toggleProduction
};