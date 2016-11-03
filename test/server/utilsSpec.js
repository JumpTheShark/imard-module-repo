"use strict";

const
	utils     = require("../../server/utils"),
	constants = require("../../server/constants"),
	exec      = require("child_process").exec,
	assert    = require("assert");

const clearCloned = () =>
	new Promise((resolve, reject) => {
		exec(constants.COMMAND_RM_R + " " + constants.CLONED_REPO_FOLDER_NAME, (_, __, err) => {
			resolve();
		});
	});

const clearBuilt = () =>
	new Promise((resolve, reject) => {
		exec(constants.COMMAND_RM_R + " " + constants.BUILT_REPO_FOLDER_NAME, (_, __, err) => {
			resolve();
		});
	});

const clearAll = () =>
	new Promise((resolve, reject) => {
		clearCloned().then(
			() => {
				clearBuilt().then(resolve, resolve);
			},
			() => {
				clearBuilt().then(resolve, resolve);
			});
	});

describe("Utility", () => {
	describe("remove cloned repo", () => {
		beforeEach((done) => {
			clearCloned().then(done, done);
		});

		afterEach((done) => {
			clearCloned().then(done, done);
		});

		it("removes the folder with cloned repo", (done) => {
			exec(constants.COMMAND_MKDIR + " " + constants.CLONED_REPO_FOLDER_NAME, (_, __, err) => {
				assert(err === null || err === "");

				utils.removeClonedRepo().then(done, done);
			});
		});

		it("goes to the reject branch if the folder with cloned repo not exist", (done) => {
			utils.removeClonedRepo().then(
				() => {
					done("true");
				},
				() => {
					done();
				});
		});
	});

	describe("remove built repo", () => {
		beforeEach((done) => {
			clearBuilt().then(done, done);
		});

		afterEach((done) => {
			clearBuilt().then(done, done);
		});

		it("removes the folder with built repo", (done) => {
			exec(constants.COMMAND_MKDIR + " " + constants.BUILT_REPO_FOLDER_NAME, (_, __, err) => {
				assert(err === null || err === "");

				utils.removeBuiltRepo().then(done, done);
			});
		});

		it("goes to the reject branch if the folder with built repo not exist", (done) => {
			utils.removeBuiltRepo().then(
				() => {
					done("true");
				},
				() => {
					done();
				});
		});
	});

	describe("remove cloned and built repo", () => {
		beforeEach((done) => {
			clearAll().then(done, done);
		});

		afterEach((done) => {
			clearAll().then(done, done);
		});

		it("removes the folders with cloned and built repo", (done) => {
			exec(constants.COMMAND_MKDIR + " " + constants.CLONED_REPO_FOLDER_NAME, (_, __, err) => {
				assert(err === null || err === "");

				exec(constants.COMMAND_MKDIR + " " + constants.BUILT_REPO_FOLDER_NAME, (___, ____, err2) => {
					assert(err2 === null || err2 === "");

					utils.removeClonedAndBuiltRepo().then(done, done);
				});
			});
		});

		it("goes to the resolve branch if the folder with cloned repo exists, but with built does not", (done) => {
			exec(constants.COMMAND_MKDIR + " " + constants.CLONED_REPO_FOLDER_NAME, (_, __, err) => {
				assert(err === null || err === "");

				utils.removeClonedAndBuiltRepo().then(done, done);
			});
		});

		it("goes to the resolve branch if the folder with cloned repo does not exist, but with built does", (done) => {
			exec(constants.COMMAND_MKDIR + " " + constants.BUILT_REPO_FOLDER_NAME, (_, __, err) => {
				assert(err === null || err === "");

				utils.removeClonedAndBuiltRepo().then(done, done);
			});
		});

		it("goes to the reject branch if both cloned and built repository folders do not exist", (done) => {
			utils.removeClonedAndBuiltRepo().then(
				() => {
					done("true");
				},
				() => {
					done();
				});
		});
	});
});