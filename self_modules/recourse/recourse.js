"use strict";

const fs = require("fs");

const MARKER           = "//$test$",
      MARKER_COMMENTED = "//test| ",
      ENCODING         = "utf8",
      NEWLINE_REGEXP   = "\n";

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

function doWithFiles(root, func) {
	fs.readdir(root, (error, filePaths) => { // TODO not only in the root folder
		if (error != null) {
			console.log("error: " + error);
			return;
		}
		
		filePaths = filePaths.filter((path, ind, arr) => {
			return path.indexOf(".js", path.length - 3) !== -1;
		});
		
		if (root.indexOf("/", root.length - 1) == -1)
			root += "/";
		
		for (let i = 0; i < filePaths.length; i++)
			filePaths[i] = root + filePaths[i];
		
		func(filePaths);
	});
}

//************************************** IDEOLOGICAL CODE PART <start>

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

function toggleTest(root) {
	doWithContent(root, fileToggleTest);
}

function toggleProduction(root) {
	doWithContent(root, fileToggleProduction);
}

exports = module.exports = {
	toggleTest: toggleTest,
	toggleProduction: toggleProduction
}