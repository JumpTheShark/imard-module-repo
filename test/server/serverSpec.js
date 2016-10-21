"use strict";

const
	server    = require("../../server/server"),
	constants = require("../../server/constants"),
	index     = require("../../server/index"),
	expect    = require("chai").expect;

const
	start      = server.start,
	PORT       = 8888;

describe("Server", () => {
	let testServer = null;

	before(() => {
		testServer = index.getDefaultServer().listen(constants.TEST_PORT);
	});

	after(() => {
		testServer.close();
	});

	it("start function exists", () => {
		expect(start).not.to.be.an("undefined");
	});

	it(`port is equal to ${PORT}`, () => {
		expect(server.PORT).not.to.be.an("undefined");
		expect(server.PORT).to.equal(PORT);
	});

	it("does not crash when sending huge data", () => {
		//expect().not.to.be.an("undefined"); TODO test
	});
});