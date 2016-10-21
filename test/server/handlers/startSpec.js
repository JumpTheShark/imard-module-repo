"use strict";

const
	request   = require("../../../server/handlers/start"),
	expect    = require("chai").expect,
	test      = require("supertest"),
	constants = require("../../../server/constants"),
	index     = require("../../../server/index");

const
	STATUS_CODE_OK = constants.STATUS_CODE_OK,
	CONTENT_TYPE   = constants.CONTENT_TYPE,
	TEXT_HTML      = constants.TEXT_HTML;

describe("Request start", () => {
	it("exists", () => {
		expect(request.start).not.to.be.an("undefined");
	});

	it("html body exists and is a string", () => {
		expect(request.BODY).to.be.a("string");
	});

	describe("response", () => {
		let testServer = null;

		before(() => {
			testServer = index.getDefaultServer().listen(constants.TEST_PORT);
		});

		after(() => {
			testServer.close();
		});

		it(`returns code ${STATUS_CODE_OK} with text`, (done) => {
			test(testServer)
				.get("/start")
				.expect(CONTENT_TYPE, TEXT_HTML)
				.expect(STATUS_CODE_OK, done);
		});
	});
});