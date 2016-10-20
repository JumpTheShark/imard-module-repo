"use strict";

const
	handlers = require("../../../server/handlers/requestHandlers"),
	expect   = require("chai").expect;

describe("Request handlers'", () => {
	describe("request", () => {
		it("start binded", () => {
			expect(handlers.start).not.to.be.an("undefined");
		});

		it("clone-redirect binded", () => {
			expect(handlers.cloneRedirect).not.to.be.an("undefined");
		});

		it("clone binded", () => {
			expect(handlers.clone).not.to.be.an("undefined");
		});

		it("compile binded", () => {
			expect(handlers.compile).not.to.be.an("undefined");
		});
	});
});