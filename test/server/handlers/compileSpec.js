"use strict";

const
	request   = require("../../../server/handlers/compile"),
	expect    = require("chai").expect,
	test      = require("supertest"),
	constants = require("../../../server/constants"),
	clean     = require("../../../server/utils").removeBuiltRepo,
	index     = require("../../../server/index");

const
	STATUS_CODE_OK   = constants.STATUS_CODE_OK,
	STATUS_CODE_BAD  = constants.STATUS_CODE_BAD,
	CONTENT_TYPE     = constants.CONTENT_TYPE,
	TEXT_PLAIN       = constants.TEXT_PLAIN,
	TEST_CLONED_PATH = constants.TEST_CLONED_REPO_FOLDER_NAME;

describe("Request compile", () => {
	it("exists", () => {
		expect(request.compile).not.to.be.an("undefined");
	});

	describe("response", () => {
		let testServer = null;

		before(() => {
			clean();
			testServer = index.getDefaultServer().listen(constants.TEST_PORT);
		});

		after(() => {
			testServer.close();
			clean();
		});

		it(`returns code ${STATUS_CODE_BAD} text when sending no link`, (done) => {
			test(testServer)
				.post("/compile")
				.send(null)
				.expect(CONTENT_TYPE, TEXT_PLAIN)
				.expect(STATUS_CODE_BAD, done);
		});

		it(`returns code ${STATUS_CODE_OK} when sending a valid test link`, (done) => {
			test(testServer)
				.post("/compile")
				.send(TEST_CLONED_PATH)
				.expect(CONTENT_TYPE, TEXT_PLAIN)
				.expect(STATUS_CODE_OK, done);
		});
	});
});