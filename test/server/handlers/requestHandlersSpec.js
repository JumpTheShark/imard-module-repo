"use strict";

const handlers = require("../../../server/handlers/requestHandlers"),
      expect   = require("chai").expect;

describe("Request handlers'", () => {
	describe("constant ", () => {
		it("CONTENT_TYPE_TEXT_PLAIN exists and is isomorphic to { \"Content-Type\": \"text/plain\" }", () => {
			expect(handlers.CONTENT_TYPE_TEXT_PLAIN).not.to.be.an('undefined');
			expect(handlers.CONTENT_TYPE_TEXT_PLAIN["Content-Type"]).to.equal("text/plain");
		});
		
		it("STATUSCODE_OK is equal to 200", () => {
			expect(handlers.STATUSCODE_OK).to.equal(200);
		});
		
		it("STATUSCODE_BAD is equal to 400", () => {
			expect(handlers.STATUSCODE_BAD).to.equal(400);
		});
	});
	
	describe("request", () => {
		it("start binded", () => {
			expect(handlers.start).not.to.be.an('undefined');
		});
		
		it("clone-redirect binded", () => {
			expect(handlers.cloneRedirect).not.to.be.an('undefined');
		});
		
		it("clone binded", () => {
			expect(handlers.clone).not.to.be.an('undefined');
		});
		
		it("compile binded", () => {
			expect(handlers.compile).not.to.be.an('undefined');
		});
	});
});