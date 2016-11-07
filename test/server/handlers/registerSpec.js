"use strict";

const
	request   = require("../../../server/handlers/register"),
	expect    = require("chai").expect,
	test      = require("supertest"),
	constants = require("../../../server/constants"),
	global    = require("../../../server/GlobalConfiguraition"),
	index     = require("../../../server/index");

const
	STATUS_CODE_OK   = constants.STATUS_CODE_OK,
	CONTENT_TYPE     = constants.CONTENT_TYPE,
	TEXT_PLAIN       = constants.TEXT_PLAIN;

describe("Request register", () => {
	it("exists", () => {
		expect(request.register).not.to.be.an("undefined");
	});

	describe("response", () => { /* TODO tests on invalid options */
		let testServer = null;

		before(() => {
			global.config.setMode(global.MODE_TEST);
			testServer = index.getDefaultServer().listen(global.config.getPort());
		});

		after(() => {
			global.config.setMode(global.MODE_DEFAULT);
			testServer.close();
		});

		it(`returns code ${STATUS_CODE_OK} when running with test cloned and built repository`, (done) => {
			test(testServer)
				.post("/register")
				.expect(CONTENT_TYPE, TEXT_PLAIN)
				.expect(STATUS_CODE_OK, done);
		});
	});
});