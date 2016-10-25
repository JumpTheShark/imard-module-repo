"use strict";

const
	utils     = require("../../server/utils"),
	constants = require("../../server/constants"),
	exec      = require("child_process").exec,
	expect    = require("chai").expect;

const clearCloned = () => {
	exec(constants.COMMAND_RM_RF + " " + constants.CLONED_REPO_FOLDER_NAME, (_, __, err) => {
	});
};

const clearBuilt = () => {
	exec(constants.COMMAND_RM_RF + " " + constants.BUILT_REPO_FOLDER_NAME, (_, __, err) => {
	});
};

const clearAll = () => {
	clearCloned();
	clearBuilt();
};

describe("Utility", () => {
	describe("remove cloned repo", () => {
		beforeEach(() => {
			clearCloned();
		});

		afterEach(() => {
			clearCloned();
		});

		it("removes the folder with cloned repo", () => {
			exec(constants.COMMAND_MKDIR + " " + constants.CLONED_REPO_FOLDER_NAME, (_, __, err) => {
				expect(utils.removeClonedRepo()).to.equal(true);
			});
		});

		it("returns false if the folder with cloned repo not exist", () => {
			expect(utils.removeClonedRepo()).to.equal(false);
		});
	});

	describe("remove built repo", () => {
		beforeEach(() => {
			clearBuilt();
		});

		afterEach(() => {
			clearBuilt();
		});

		it("removes the folder with built repo", () => {
			exec(constants.COMMAND_MKDIR + " " + constants.BUILT_REPO_FOLDER_NAME, (_, __, err) => {
				expect(utils.removeBuiltRepo()).to.equal(true);
			});
		});

		it("returns false if the folder with built repo not exist", () => {
			expect(utils.removeBuiltRepo()).to.equal(false);
		});
	});

	describe("remove cloned and built repo", () => {
		beforeEach(() => {
			clearAll();
		});

		afterEach(() => {
			clearAll();
		});

		it("removes the folders with cloned and built repo", () => {
			exec(constants.COMMAND_MKDIR + " " + constants.CLONED_REPO_FOLDER_NAME, (_, __, err) => {
				exec(constants.COMMAND_MKDIR + " " + constants.BUILT_REPO_FOLDER_NAME, (_, __, err2) => {
					expect(utils.removeClonedAndBuiltRepo()).to.equal(true);
				});
			});
		});

		it("returns true if the folder with cloned repo exists, but with built does not", () => {
			exec(constants.COMMAND_MKDIR + " " + constants.CLONED_REPO_FOLDER_NAME, (_, __, err) => {
				expect(utils.removeClonedAndBuiltRepo()).to.equal(true);
			});
		});

		it("returns true if the folder with cloned repo does not exist, but with built does", () => {
			exec(constants.COMMAND_MKDIR + " " + constants.BUILT_REPO_FOLDER_NAME, (_, __, err) => {
				expect(utils.removeClonedAndBuiltRepo()).to.equal(true);
			});
		});

		it("returns false if both cloned and built repository folders do not exist", () => {
			expect(utils.removeClonedAndBuiltRepo()).to.equal(false);
		});
	});
});