"use strict";

const
	handle = require("../../server/index").handle,
	expect = require("chai").expect;

describe("Outer handler object", () => {
	it("exists", () => {
		expect(handle).not.to.be.an("undefined");
	});

	it("request types exist", () => {
		expect(handle.get) .not.to.be.an("undefined");
		expect(handle.post).not.to.be.an("undefined");
		expect(handle.put) .not.to.be.an("undefined");
	});

	describe("contains request", () => {
		it("start", () => {
			expect(handle.get["/"]).not.to.be.an("undefined");
			expect(handle.get["/start"]).not.to.be.an("undefined");
		});

		it("clone-redirect", () => {
			expect(handle.post["/clone-redirect"]).not.to.be.an("undefined");
		});

		it("clone", () => {
			expect(handle.put["/clone"]).not.to.be.an("undefined");
		});

		it("compile", () => {
			expect(handle.post["/compile"]).not.to.be.an("undefined");
		});
	});
});