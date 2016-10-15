"use strict";

const request         = require("../../../server/handlers/cloneRedirect"),
      expect          = require("chai").expect,
	  http            = require("http"),
	  requestHandlers = require("../../../server/handlers/requestHandlers");

const
	STATUS_CODE_OK          = requestHandlers.STATUS_CODE_OK,
	STATUS_CODE_BAD         = requestHandlers.STATUS_CODE_BAD,
	CONTENT_TYPE_TEXT_PLAIN = requestHandlers.CONTENT_TYPE_TEXT_PLAIN,
	cloneRedirect           = request.cloneRedirect;

describe("Request clone-redirect", () => {
	it("exists", () => {
		expect(cloneRedirect).not.to.be.an("undefined");
	});

	describe("response", () => {
		it("returns code " + STATUS_CODE_BAD + " with text when sending null postData", () => {
			const reply = cloneRedirect(new http.ServerResponse(() => {}, () => {}), null);

			expect(reply.statusCode).to.equal(STATUS_CODE_BAD);
			expect(reply.contentType).to.equal(CONTENT_TYPE_TEXT_PLAIN);
		});
	});
});