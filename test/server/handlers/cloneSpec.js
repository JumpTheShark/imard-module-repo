"use strict";

const
	request   = require("../../../server/handlers/clone"),
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
	TEST_REPO_ADDRESS = constants.TEST_REPO_ADDRESS,
	clone             = request.clone;

describe("Request clone", () => {
	it("exists", () => {
		expect(clone).not.to.be.an("undefined");
	});

	describe("response", () => {
		let testServer = null;

		before(() => {
			global.config.setMode(global.MODE_TEST);
			testServer = index.getDefaultServer().listen(global.config.getPort());
		});

		after(() => {
			testServer.close();
			global.config.setMode(global.MODE_DEFAULT);
		});

		it(`returns code ${STATUS_CODE_BAD} with text when sending null link`, (done) => {
			test(testServer)
				.put("/clone")
				.query({ link : null })
				.expect(CONTENT_TYPE, TEXT_PLAIN)
				.expect(STATUS_CODE_BAD, done);
		});

		it(`returns code ${STATUS_CODE_BAD} when sending an empty link`, (done) => {
			test(testServer)
				.put("/clone")
				.query({ link : "" })
				.expect(CONTENT_TYPE, TEXT_PLAIN)
				.expect(STATUS_CODE_BAD, done);
		});

		it(`returns code ${STATUS_CODE_OK} when sending a valid test link`, (done) => {
			test(testServer)
				.put("/clone")
				.query({ link : TEST_REPO_ADDRESS })
				.expect(CONTENT_TYPE, TEXT_PLAIN)
				.expect(STATUS_CODE_OK, done);
		});
	});
});