"use strict";

const
	request   = require("../../../server/handlers/compile"),
	expect    = require("chai").expect,
	test      = require("supertest"),
	constants = require("../../../server/constants"),
	index     = require("../../../server/index");

const
	STATUS_CODE_OK  = constants.STATUS_CODE_OK,
	STATUS_CODE_BAD = constants.STATUS_CODE_BAD,
	CONTENT_TYPE    = constants.CONTENT_TYPE,
	TEXT_PLAIN      = constants.TEXT_PLAIN;

describe("Request compile", () => {
	it("exists", () => {
		expect(request.compile).not.to.be.an("undefined");
	});

	describe("response", () => {
		let testServer = null;

		before(() => {
			testServer = index.getDefaultServer().listen(constants.TEST_PORT);
		});

		after(() => {
			testServer.close();
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
				.send("??") /* TODO give a real code link */
				.expect(CONTENT_TYPE, TEXT_PLAIN)
				.expect(STATUS_CODE_OK, done);
		});
	});
});