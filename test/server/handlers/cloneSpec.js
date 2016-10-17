"use strict";

const
	request         = require("../../../server/handlers/clone"),
	expect          = require("chai").expect,
	http            = require("http"),
	requestHandlers = require("../../../server/handlers/requestHandlers");

const
	STATUS_CODE_BAD         = requestHandlers.STATUS_CODE_BAD,
	CONTENT_TYPE_TEXT_PLAIN = requestHandlers.CONTENT_TYPE_TEXT_PLAIN,
	clone                   = request.clone;

describe("Request clone", () => {
	it("exists", () => {
		expect(clone).not.to.be.an("undefined");
	});

	describe("response", () => {
		it("returns code " + STATUS_CODE_BAD + " with text when sending no link", () => {
			const reply = clone(new http.ServerResponse(() => {}, () => {}), null);

			expect(reply.statusCode).to.equal(STATUS_CODE_BAD);
			expect(reply.contentType).to.equal(CONTENT_TYPE_TEXT_PLAIN);
		});
	});
});