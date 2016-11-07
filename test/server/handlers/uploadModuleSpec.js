"use strict";

const
	request   = require("../../../server/handlers/uploadModule"),
	expect    = require("chai").expect,
	test      = require("supertest"),
	constants = require("../../../server/constants"),
	global    = require("../../../server/GlobalConfiguraition"),
	index     = require("../../../server/index");

const
	STATUS_CODE_BAD       = constants.STATUS_CODE_BAD,
	STATUS_CODE_OK        = constants.STATUS_CODE_OK,
	CONTENT_TYPE          = constants.CONTENT_TYPE,
	TEXT_PLAIN            = constants.TEXT_PLAIN,
	TEST_REPO_ADDRESS     = constants.TEST_REPO_ADDRESS,
	LINK_INPUT_FIELD_NAME = constants.LINK_INPUT_FIELD_NAME;

describe("Request upload-module", () => {
	it("exists", () => {
		expect(request.uploadModule).not.to.be.an("undefined");
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

		it(`returns code ${STATUS_CODE_BAD} with text when sending null postData`, (done) => {
			test(testServer)
				.post("/upload-module")
				.send(null)
				.expect(CONTENT_TYPE, TEXT_PLAIN)
				.expect(STATUS_CODE_BAD, done);
		});

		it(`returns code ${STATUS_CODE_BAD} with text when sending a link by inappropriate way`, (done) => {
			test(testServer)
				.post("/upload-module")
				.send("blablabla")
				.expect(CONTENT_TYPE, TEXT_PLAIN)
				.expect(STATUS_CODE_BAD, done);
		});

		it(`returns code ${STATUS_CODE_BAD} with text when sending an invalid link`, (done) => {
			test(testServer)
				.post("/upload-module")
				.send(`${LINK_INPUT_FIELD_NAME}=blablabla`)
				.expect(CONTENT_TYPE, TEXT_PLAIN)
				.expect(STATUS_CODE_BAD, done);
		});

		it(`returns code ${STATUS_CODE_OK} when sending a valid test link`, (done) => {
			test(testServer)
				.post("/upload-module")
				.send(`${LINK_INPUT_FIELD_NAME}=${TEST_REPO_ADDRESS}`)
				.expect(CONTENT_TYPE, TEXT_PLAIN)
				.expect(STATUS_CODE_OK, done);
		});
	});
});