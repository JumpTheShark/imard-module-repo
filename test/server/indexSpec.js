"use strict";

const handle = require("../../server/index").handle,
      expect = require("chai").expect;

describe("checking handle methods are OK", () => {
	it("handle exists", () => {
		expect(handle).not.to.be.an("undefined");
	});
	
	it("handle method types exist", () => {
		expect(handle["get"]) .not.to.be.an("undefined");
		expect(handle["post"]).not.to.be.an("undefined");
		expect(handle["put"]) .not.to.be.an("undefined");
	});
	
	//** methods
	
	it("handle method 'start' exists", () => {
		expect(handle["get"]["/"]).not.to.be.an("undefined");
		expect(handle["get"]["/start"]).not.to.be.an("undefined");
	});
	
	it("handle method 'clone-redirect' exists", () => {
		expect(handle["post"]["/clone-redirect"]).not.to.be.an("undefined");
	});
	
	it("handle method 'clone' exists", () => {
		expect(handle["put"]["/clone"]).not.to.be.an("undefined");
	});
	
	it("handle method 'compile' exists", () => {
		expect(handle["post"]["/compile"]).not.to.be.an("undefined");
	});
});