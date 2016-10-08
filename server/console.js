//////////
// Plug //
//////////

"use strict";

const COMMAND_CLONE   = "git clone";
const COMMAND_COMPILE = "compile";

function run(command, data) {
	let res;
	
	switch (command) {
		case COMMAND_CLONE:
			res = clone(data);
			return (res.error == undefined) ? true : res.error;
		case COMMAND_COMPILE:
			res = compile(data);
			return (res.error == undefined) ? res.compiled : res.error;
	}
};

function clone(data) {
	// TODO
	return { error: "Not supported yet.\nThe repo '" + data + "' was not cloned." };
}

function compile(data) {
	// TODO
	return { error: "Not supported yet. The data '" + data + "' was not compiled." };
}

exports = module.exports = {
	run             : run,
	COMMAND_CLONE   : COMMAND_CLONE,
	COMMAND_COMPILE : COMMAND_COMPILE
};