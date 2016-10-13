"use strict";

const start  = require("../../server/server").start,
      PORT   = require("../../server/server").PORT,
      expect = require("chai").expect;

describe("checking server processes everything correctly", () => {
	it("start function exists", () => {
		expect(start).not.to.be.an("undefined");
	});
	
	it("port is valid", () => {
		expect(PORT).not.to.be.an("undefined");
		expect(PORT).to.equal(8888);
	});
});