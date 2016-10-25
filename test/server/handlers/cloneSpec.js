"use strict";

const
	request   = require("../../../server/handlers/clone"),
	expect    = require("chai").expect,
	test      = require("supertest"),
	constants = require("../../../server/constants"),
	clean     = require("../../../server/utils").removeClonedAndBuiltRepo,
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
			clean();
			testServer = index.getDefaultServer().listen(constants.TEST_PORT);
		});

		after(() => {
			testServer.close();
			clean();
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