"use strict";

const
	request   = require("../../../server/handlers/clone"),
	expect    = require("chai").expect,
	http      = require("http"),
	constants = require("../../../server/constants");

const
	STATUS_CODE_BAD         = constants.STATUS_CODE_BAD,
	CONTENT_TYPE_TEXT_PLAIN = constants.CONTENT_TYPE_TEXT_PLAIN,
	clone                   = request.clone;

describe("Request clone", () => {
	it("exists", () => {
		expect(clone).not.to.be.an("undefined");
	});

	describe("response", () => {
		it("returns code " + STATUS_CODE_BAD + " with text when sending no link", () => {
			const
				reply1 = new http.ServerResponse(() => {}, () => {}),
				reply2 = new http.ServerResponse(() => {}, () => {});

			clone(reply1, "");
			clone(reply2, null);

			expect(reply1.statusCode).to.equal(STATUS_CODE_BAD);
			expect(reply1.getHeader("content-type")).to.equal(CONTENT_TYPE_TEXT_PLAIN);

			expect(reply2.statusCode).to.equal(STATUS_CODE_BAD);
			expect(reply2.getHeader("content-type")).to.equal(CONTENT_TYPE_TEXT_PLAIN);
		});
	});
});