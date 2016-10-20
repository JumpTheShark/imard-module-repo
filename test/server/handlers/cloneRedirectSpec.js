"use strict";

const
	request   = require("../../../server/handlers/cloneRedirect"),
	expect    = require("chai").expect,
	http      = require("http"),
	constants = require("../../../server/constants");

const
	STATUS_CODE_BAD         = constants.STATUS_CODE_BAD,
	CONTENT_TYPE_TEXT_PLAIN = constants.CONTENT_TYPE_TEXT_PLAIN,
	cloneRedirect           = request.cloneRedirect;

describe("Request clone-redirect", () => {
	it("exists", () => {
		expect(cloneRedirect).not.to.be.an("undefined");
	});

	describe("response", () => {
		it("returns code " + STATUS_CODE_BAD + " with text when sending null postData", () => {
			const reply = new http.ServerResponse(() => {}, () => {});

			cloneRedirect(reply, null);

			expect(reply.statusCode).to.equal(STATUS_CODE_BAD);
			expect(reply.getHeader("content-type")).to.equal(CONTENT_TYPE_TEXT_PLAIN);
		});
	});
});