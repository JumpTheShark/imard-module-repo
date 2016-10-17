"use strict";

const
	server = require("../../server/server"),
	expect = require("chai").expect;

const
	start  = server.start,
	PORT   = 8888;

describe("Server", () => {
	it("start function exists", () => {
		expect(start).not.to.be.an("undefined");
	});

	it("port is equal to " + PORT, () => {
		expect(server.PORT).not.to.be.an("undefined");
		expect(server.PORT).to.equal(PORT);
	});
});