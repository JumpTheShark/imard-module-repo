"use strict";

const start  = require("../../server/server").start,
      PORT   = require("../../server/server").PORT,
      expect = require("chai").expect;

describe("Server", () => {
	it("start function exists", () => {
		expect(start).not.to.be.an("undefined");
	});
	
	it("port is 8888", () => {
		expect(PORT).not.to.be.an("undefined");
		expect(PORT).to.equal(8888);
	});
});