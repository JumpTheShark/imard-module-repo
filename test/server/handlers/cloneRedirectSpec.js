"use strict";

const
	request   = require("../../../server/handlers/cloneRedirect"),
	expect    = require("chai").expect,
	test      = require("supertest"),
	constants = require("../../../server/constants"),
	global    = require("../../../server/GlobalConfiguraition"),
	index     = require("../../../server/index");

const
	STATUS_CODE_BAD   = constants.STATUS_CODE_BAD,
	STATUS_CODE_OK    = constants.STATUS_CODE_OK,
	CONTENT_TYPE      = constants.CONTENT_TYPE,
	TEXT_PLAIN        = constants.TEXT_PLAIN,
	TEST_REPO_ADDRESS = constants.TEST_REPO_ADDRESS;

describe("Request clone-redirect", () => {
	it("exists", () => {
		expect(request.cloneRedirect).not.to.be.an("undefined");
	});

	describe("response", () => {
		let testServer = null;

		before(() => {
			global.config.setMode(global.MODE_TEST);
			testServer = index.getDefaultServer().listen(constants.TEST_PORT);
		});

		after(() => {
			testServer.close();
			global.config.setMode(global.MODE_DEFAULT);
		});

		it(`returns code ${STATUS_CODE_BAD} with text when sending null postData`, (done) => {
			test(testServer)
				.post("/clone-redirect")
				.send(null)
				.expect(CONTENT_TYPE, TEXT_PLAIN)
				.expect(STATUS_CODE_BAD, done);
		});

		it(`returns code ${STATUS_CODE_BAD} with text when sending an invalid link`, (done) => {
			test(testServer)
				.post("/clone-redirect")
				.send("blablabla")
				.expect(CONTENT_TYPE, TEXT_PLAIN)
				.expect(STATUS_CODE_BAD, done);
		});

		it(`returns code ${STATUS_CODE_OK} when sending a valid test link`, (done) => {
			test(testServer)
				.post("/clone-redirect")
				.send(TEST_REPO_ADDRESS)
				.expect(CONTENT_TYPE, TEXT_PLAIN)
				.expect(STATUS_CODE_OK, done);
		});
	});
});